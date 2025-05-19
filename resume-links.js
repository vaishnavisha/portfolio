    // Where the live links are stored (change to your own URL)
    const RESUME_JSON_URL = "/resume-links.json";  // put the file beside index.html

    let resumeLinks = null;  // cached copy

    // Fetch JSON once, cache in memory
    async function fetchLinks() {
    if (resumeLinks) return resumeLinks;

    try {
        const resp = await fetch(RESUME_JSON_URL, { cache: "no-store" });
        if (!resp.ok) throw new Error(resp.statusText);
        resumeLinks = await resp.json();  // { "core": "https://...", "it": "https://..." }
    } catch (err) {
        console.error("Resume link fetch failed:", err);
        alert("Sorry, résumé download is temporarily unavailable. Please email me.");
    }
    return resumeLinks;
    }
    // Attach to button click
    async function downloadResume(type) {
    const links = await fetchLinks();
    if (!links || !links[type]) return;
    // Create a temporary hidden <a> and click it
    const tmp = document.createElement("a");
    tmp.href = links[type];
    tmp.download = "";          // let browser keep filename from URL
    tmp.style.display = "none";
    document.body.appendChild(tmp);
    tmp.click();
    document.body.removeChild(tmp);
    }
