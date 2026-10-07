// Shared between the server layout (inline script) and the client toggle.
export type Mode = "engineer" | "recruiter";

export const MODE_KEY = "aj-mode";
export const MODE_EVENT = "aj-mode-change";

// Runs before first paint. `?mode=recruiter` (or engineer) in the URL wins and is remembered,
// so a recruiter link opens straight into recruiter mode.
export const modeScript = `(function(){try{var d=document.documentElement,m=localStorage.getItem("${MODE_KEY}"),q=new URLSearchParams(location.search).get("mode");if(q==="recruiter"||q==="engineer"){m=q;localStorage.setItem("${MODE_KEY}",q)}d.dataset.mode=m==="recruiter"?"recruiter":"engineer"}catch(e){}})();`;
