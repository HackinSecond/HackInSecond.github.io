// All content lives here. Add an object to a list and it appears automatically.
window.HIS_DATA = {
  // VIDEOS: only add real videos. Example:
  // { id:"VIDEO_ID", title:"Your real title", description:"...", channel:"Hack In Seconds", category:"Beginner", tags:["linux"], date:"2026-01-31", featured:true, tools:["wireshark"], courses:[] }
  videos: [],
  tools: [
    { id:"wireshark", name:"Wireshark", category:"Network Security", level:"Beginner", type:"Free",
      short:"Open-source network protocol analyzer for learning how traffic works.",
      long:"Wireshark captures and inspects network traffic. It is widely used in teaching networking and troubleshooting.",
      features:["Packet capture and filtering","Protocol dissection","Free and open source"],
      requirements:"Windows, macOS or Linux. Capture only on networks you own or are authorized to monitor.",
      source:"https://www.wireshark.org/", download:"https://www.wireshark.org/download.html", docs:"https://www.wireshark.org/docs/", tags:["network","packets"] },
    { id:"nmap", name:"Nmap", category:"Network Security", level:"Intermediate", type:"Free",
      short:"Network discovery and security auditing tool.",
      long:"Nmap maps hosts and services on a network. Use it only against systems you own or have written permission to test.",
      features:["Host discovery","Service detection","Scriptable engine"],
      requirements:"Windows, macOS or Linux. Authorization required before scanning any network.",
      source:"https://nmap.org/", download:"https://nmap.org/download.html", docs:"https://nmap.org/docs.html", tags:["network","scanning"] },
    { id:"juice-shop", name:"OWASP Juice Shop", category:"Authorized Practice Labs", level:"Beginner", type:"Free",
      short:"Intentionally vulnerable web app for safe, legal practice.",
      long:"A deliberately insecure application from OWASP for learning web security in your own lab.",
      features:["Many vulnerability types","Runs locally","Open source"],
      requirements:"Run it locally (for example with Docker or Node.js). Do not expose it to the internet.",
      source:"https://owasp.org/www-project-juice-shop/", download:"", docs:"https://pwning.owasp-juice.shop/", tags:["web","lab","owasp"] },
    { id:"hibp", name:"Have I Been Pwned", category:"Digital Privacy and Safety", level:"Beginner", type:"Free",
      short:"Check whether your email appeared in known data breaches.",
      long:"A well-known service by Troy Hunt for checking breach exposure. Never enter passwords into untrusted sites.",
      features:["Email breach lookup","Breach notifications"],
      requirements:"Web browser.",
      source:"https://haveibeenpwned.com/", download:"", docs:"https://haveibeenpwned.com/About", tags:["privacy","breach"] }
  ],
  // PRODUCTS / COURSES: none configured yet. Add real ones, e.g.
  // { id:"intro", title:"...", description:"...", level:"Beginner", prerequisites:"...", outcomes:["..."], curriculum:[{section:"...", lessons:["..."]}], price:"49", currency:"USD", checkout:"https://real-checkout-url", sample:"", support:"", terms:"" }
  products: [],
  courses: [],
  faqs: [
    { q:"What is ethical hacking?", a:"Ethical hacking is testing systems with the owner's explicit permission to find and fix weaknesses.", link:"/tutorials/", kw:"ethical hacking what" },
    { q:"How can beginners start learning cybersecurity?", a:"Start with networking, Linux basics and security fundamentals, then practice in a lab you own.", link:"/tools/", kw:"beginner start learn" },
    { q:"Where can I find free tools?", a:"The Free Tools directory lists tools with links to their official sources.", link:"/tools/", kw:"free tools download" },
    { q:"How do I download tools safely?", a:"Use the official source linked on each tool page, verify checksums or signatures when published, and avoid re-uploaded copies.", link:"/tools/", kw:"download safe safely" },
    { q:"Which course suits a beginner?", a:"No courses are published yet. Check the Courses page for updates.", link:"/courses/", kw:"course beginner prerequisites price" },
    { q:"How do I contact Hack In Seconds?", a:"Use the contact form or the YouTube channels.", link:"/contact", kw:"contact support help email" },
    { q:"Is this site for illegal hacking?", a:"No. Everything here is for lawful, authorized education and defense.", link:"/legal/disclaimer", kw:"legal authorized illegal disclaimer terms privacy" }
  ]
};
