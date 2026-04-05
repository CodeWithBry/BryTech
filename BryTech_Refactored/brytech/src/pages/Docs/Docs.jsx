import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import DocsSidebar from "./DocsSidebar";
import DocsContents from "./DocsContents";
import s from "./Docs.module.css";

const DOC_LINKS = [
  {
    label: "Oct 20 – Oct 22", slug: "Oct_20_-_Oct_22", open: false,
    sections: [
      { id: "Project_Setup", title: "Project Setup", content: [
        { h3: "Project Setup", p: "By Oct 20, 2025, I decided to build an e-commerce website displaying different hardware products." },
        { img: ["./Documentations/Home/REFERENCE_1.png"], p: "I searched for UI references to guide the design of my e-commerce site — hero sections, navigation, and product cards." },
      ]},
      { id: "BryTech_Tab_Lists", title: "BryTech's Tab Lists", content: [
        { h4: "BryTech's Tab Lists", li: ["1. Home Page","2. Shop Page","3. Cart Page","4. BotBry Page","5. About Page","6. Documentation Page"] },
        { img: ["./Documentations/Home/FOLDER_STRUCTURE_1.png","./Documentations/Home/FOLDER_STRUCTURE_2.png"], h4: "Project Folder Setup", p: "Oct 21 — I created the initial folder structure, naming files by their UI role." },
      ]},
      { id: "Designing_Home_Tab", title: "Designing & Coding Home Tab", content: [
        { img: ["./Documentations/Home/HOME PAGE 1.JPG","./Documentations/Home/HOME PAGE 1 NIGHT MODE.JPG","./Documentations/Home/HOME PAGE 2.JPG","./Documentations/Home/HOME PAGE 3.JPG"], h3: "Designing & Coding Home Tab", p: "Oct 22 — After laying out the Home tab, I implemented the design with dark theme and mobile support." },
      ]},
    ],
  },
  {
    label: "Oct 23 – Oct 25", slug: "Oct_23_-_Oct_25", open: false,
    sections: [
      { id: "Creating_Structure_UI", title: "Creating The Structure & UI", content: [
        { h3: "Creating The Structure & UI", p: "Oct 23–25 — I researched product display references and designed the Shop tab's layout.", img: ["./Documentations/Shop/REFERENCE_1.png","./Documentations/Shop/REFERENCE_2.png"] },
        { p: "I built the HTML structure with card-like containers, then styled them in CSS.", img: ["./Documentations/Shop/SHOP_CODE_1.png","./Documentations/Shop/SHOP_CODE_2.png"] },
      ]},
      { id: "JSON_Data_Collection", title: "JSON Data Collection", content: [
        { h4: "JSON Data Collection", p: "Oct 24 — I collected product data using ChatGPT to generate realistic JSON files for each category." },
        { p: "JSON files act as a lightweight data store — arrays, objects, and key-value pairs served from the public folder.", img: ["./Documentations/Shop/JSON_1.png","./Documentations/Shop/JSON_2.png"] },
      ]},
      { id: "Fetching_JSON", title: "Fetching JSON File", content: [
        { h3: "Fetching JSON File", p: "After organising products in the public folder, I fetched and rendered them dynamically.", img: ["./Documentations/Shop/SHOP PAGE 1.JPG","./Documentations/Shop/SHOP PAGE 2 PRODUCT DETAILS.JPG","./Documentations/Shop/SHOP PAGE 3 SEARCH BAR.JPG","./Documentations/Shop/SHOP PAGE 4 ADDED TO CART.JPG"] },
      ]},
      { id: "Errors_and_Bugs", title: "Errors and Bugs", content: [
        { h3: "Errors and Bugs", p: "Numerous bugs emerged while making the Shop page fully functional — it took a full day to resolve them.", img: ["./Documentations/Shop/ERROR_1.png","./Documentations/Shop/ERROR_2.png"] },
      ]},
    ],
  },
  {
    label: "Oct 26 – Oct 27", slug: "Oct_26_-_Oct_27", open: false,
    sections: [
      { id: "Challenges_Limitations", title: "Challenges and Limitations", content: [
        { h3: "Challenges and Limitations", p: "The hardest challenge was syncing Shop data with the Cart tab in real time.", img: ["./Documentations/Cart/CART PAGE 1.JPG","./Documentations/Cart/CART PAGE 2 PAYMENT METHOD PAGE.JPG"] },
        { p: "I used localStorage as a client-side store — key-value pairs persisted across sessions without any server round-trips.", img: ["./Documentations/Cart/STORAGE_1.png","./Documentations/Cart/STORAGE_2.png"] },
      ]},
      { id: "Shopee_Lazada_References", title: "Shopee & Lazada UI References", content: [
        { h4: "Shopee & Lazada UI as References", p: "I studied Lazada and Shopee's cart UIs to guide the layout and interaction patterns of my Cart tab." },
        { p: "The HTML structure and CSS took about 2 hours — covering both the cart view and the purchased-items view.", img: ["./Documentations/Cart/REFERENCE_1.png","./Documentations/Cart/REFERENCE_2.png"] },
      ]},
      { id: "Polishing_Final_Touch", title: "Polishing and Final Touch", content: [
        { h3: "Polishing and Final Touch", p: "Oct 27 — The Cart tab became fully functional and testable in the browser.", img: ["./Documentations/Cart/CART_1.png","./Documentations/Cart/CART_2.png","./Documentations/Cart/CART_3.png"] },
      ]},
    ],
  },
  {
    label: "Oct 28 – Oct 30", slug: "Oct_28_-_Oct_30", open: false,
    sections: [
      { id: "Gemini_API_Setup", title: "Gemini API Setup", content: [
        { h3: "Gemini API Setup and Setting Server Up", p: "After learning Gemini API integration in plain HTML/JS, porting it to the React project introduced many new bugs." },
        { p: "localStorage handled the chat sessions — keeping conversation history without a dedicated database.", img: ["./Documentations/BotBry/SETUP_1.png","./Documentations/BotBry/SETUP_2.png"] },
      ]},
      { id: "Improving_UI_Functions", title: "Improving UI and Functions", content: [
        { h4: "Improving UI and Functions", p: "Re-setting up the project and installing packages like react-markdown enabled beautiful AI response rendering." },
        { p: "Adding chat history persistence introduced several bugs that took significant time to resolve.", img: ["./Documentations/BotBry/BOTBRY PAGE 1 INTRO.JPG","./Documentations/BotBry/BOTBRY PAGE 2.JPG","./Documentations/BotBry/BOTBRY PAGE 3 response.JPG"] },
      ]},
      { id: "Testing_Debugging", title: "Testing and Debugging", content: [
        { h3: "Testing and Debugging", p: "A full day was spent fixing bugs and making the project stable across browsers and devices before deploying to GitHub Pages.", img: ["./Documentations/BotBry/ERROR_1.png","./Documentations/BotBry/ERROR_2.png"] },
      ]},
    ],
  },
];

export default function Docs() {
  const { defineTab } = useApp();
  const { subLink } = useParams();
  const navigate = useNavigate();
  const [links, setLinks] = useState(DOC_LINKS);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => { defineTab("/Docs"); }, []);

  useEffect(() => {
    const target = subLink ?? DOC_LINKS[0].slug;
    if (!subLink) navigate(`/Docs/${target}`);
    setLinks(prev => prev.map(l => ({
      ...l,
      open: l.slug === target,
    })));
  }, [subLink]);

  function toggleSection(slug) {
    navigate(`/Docs/${slug}`);
    setLinks(prev => prev.map(l => ({ ...l, open: l.slug === slug ? !l.open : l.open })));
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={s.docs}>
      <DocsSidebar
        links={links}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onToggle={toggleSection}
        onScrollTo={scrollToSection}
      />
      <DocsContents links={links} subLink={subLink} />
    </div>
  );
}
