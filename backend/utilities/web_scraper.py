import asyncio
import base64
from urllib.parse import urljoin
from playwright.async_api import async_playwright

async def deep_scan_url(url: str, max_images: int = 3) -> dict:
    """
    Advanced Web Scraper using Playwright.
    Executes JS, waits for network idle, reads computed styles (colors, fonts),
    extracts main image URLs, and captures a Hero screenshot as base64 for Multimodal injection.
    """
    if not url or url.lower() == 'not provided':
        return {"error": "Invalid URL"}
    
    if not url.startswith('http'):
        url = 'https://' + url

    try:
        async with async_playwright() as p:
            # Launch Chromium Headless
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                viewport={"width": 1280, "height": 800}
            )
            page = await context.new_page()
            
            # Navigate and explicitly wait for hydration/network
            try:
                await page.goto(url, wait_until="networkidle", timeout=15000)
            except Exception:
                # If networkidle fails/times out, we still try to scrape what loaded
                pass
            
            # Let animations settle
            await page.wait_for_timeout(2000)
            
            title = await page.title()
            
            # All Metadata Information (like a bot crawling)
            meta_tags = await page.evaluate('''() => {
                const tags = document.querySelectorAll('meta');
                let result = [];
                tags.forEach(t => {
                    const name = t.getAttribute('name') || t.getAttribute('property');
                    const content = t.getAttribute('content');
                    if(name && content) {
                        result.push(`${name}: ${content}`);
                    }
                });
                return result.join('\\n');
            }''')
            
            # Extract main readable text (Hero to Footer, Copyrights included)
            raw_text = await page.evaluate('() => document.body.innerText')
            
            # Simple robot emulation: Check robots.txt and sitemap presence
            robots_txt = "Not checked"
            try:
                # Basic check for sitemap indication
                if url.endswith("/"):
                    r_res = await context.request.get(url + "robots.txt")
                    if r_res.ok():
                        robots_txt = (await r_res.text())[:500] # get first 500 chars to see directives
            except Exception:
                pass
            
            if len(raw_text) > 12000:
                raw_text = raw_text[:12000] + "... (truncated)"
                
            # Compute actual visible Fonts and Colors using JS!
            # This is 100x more accurate than scraping CSS files, as it only gets what's rendered.
            aesthetics = await page.evaluate('''() => {
                const allElements = document.querySelectorAll('*');
                let colors = new Set();
                let fonts = new Set();
                
                // Helper
                function rgbToHex(rgbStr) {
                    let match = rgbStr.match(/^rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*(\\d*\\.?\\d+))?\\)$/);
                    if (!match) return rgbStr;
                    let r = parseInt(match[1]).toString(16).padStart(2, '0');
                    let g = parseInt(match[2]).toString(16).padStart(2, '0');
                    let b = parseInt(match[3]).toString(16).padStart(2, '0');
                    return `#${r}${g}${b}`.toUpperCase();
                }

                // Sample every 5th element to save execution time
                for(let i=0; i < allElements.length; i+=5) {
                    const style = window.getComputedStyle(allElements[i]);
                    // Color / Background Color
                    if(style.color && style.color !== 'rgba(0, 0, 0, 0)') {
                        colors.add(`${rgbToHex(style.color)} (${style.color})`);
                    }
                    if(style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                        colors.add(`${rgbToHex(style.backgroundColor)} (${style.backgroundColor})`);
                    }
                    
                    // Fonts
                    if(style.fontFamily) {
                        // Extract base primary font name
                        let primary = style.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
                        if(primary) fonts.add(primary);
                    }
                }
                
                return {
                    colors: Array.from(colors).slice(0, 10),
                    fonts: Array.from(fonts).slice(0, 5)
                };
            }''')
            
            unique_colors = aesthetics["colors"]
            unique_fonts = aesthetics["fonts"]

            # Capture explicit Img URLs (for thumbnails and exact asset access)
            extracted_image_urls = await page.evaluate('''(maxImgs) => {
                let validUrls = new Set();
                
                // 1. img tags
                const imgs = document.querySelectorAll('img');
                imgs.forEach(img => {
                    let src = img.src || img.getAttribute('src');
                    if (src && src.startsWith('http') && !src.includes('data:image')) {
                        validUrls.add(src);
                    }
                });
                
                // 2. background images from div, section, header
                const elements = document.querySelectorAll('div, section, header, figure, span');
                elements.forEach(el => {
                    const bg = window.getComputedStyle(el).backgroundImage;
                    if (bg && bg !== 'none' && bg.includes('url(')) {
                        const match = bg.match(/url\\(["']?(.*?)["']?\\)/);
                        if (match && match[1] && match[1].startsWith('http') && !match[1].includes('data:image')) {
                            validUrls.add(match[1]);
                        }
                    }
                });
                
                // 3. picture sources
                const sources = document.querySelectorAll('picture source');
                sources.forEach(src_el => {
                    const srcset = src_el.srcset;
                    if (srcset) {
                        // extract the first URL from srcset
                        const firstUrl = srcset.split(',')[0].trim().split(' ')[0];
                        if (firstUrl.startsWith('http')) {
                            validUrls.add(firstUrl);
                        }
                    }
                });
                
                return Array.from(validUrls).filter(url => !url.endsWith('.svg')).slice(0, maxImgs);
            }''', max_images)

            # Capture Hero Screenshot (for Multimodal AI analysis of layout/vibe)
            # base64 encoded JPG to save size
            screenshot_bytes = await page.screenshot(type="jpeg", quality=60, full_page=False)
            hero_b64 = "data:image/jpeg;base64," + base64.b64encode(screenshot_bytes).decode('utf-8')
            
            await browser.close()
            
            # We return explicit Image URLs and the special Hero shot. 
            # We can package the hero shot into our images array for the multi-modal payload.
            images_payload = [{"url": hero_b64, "base64": hero_b64}]
            for img_url in extracted_image_urls:
                # Pass the explicit URL to Langchain which can resolve it as a standard 'url'
                images_payload.append({"url": img_url, "base64": img_url}) 

            return {
                "title": title,
                "meta_tags": meta_tags,
                "robots_txt": robots_txt,
                "raw_text": raw_text,
                "colors": unique_colors,
                "fonts": unique_fonts,
                # Using the hero screenshot + any explicit img tags found
                "images": images_payload
            }
            
    except Exception as e:
        return {"error": str(e)}

