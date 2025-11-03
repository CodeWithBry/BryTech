import s from "./Docs.module.css"
import { context } from "../App"
import { useContext, useEffect, useRef, useState } from "react";
import SideBar from "./SideBar/SideBar";
import Contents from "./Contents/Contents";
import { useNavigate, useParams } from "react-router-dom";

function Docs() {
  const { defineTab, lightMode } = useContext(context);
  const { subLink } = useParams()
  const navigation = useNavigate()
  const [links, setLinks] = useState([
    {
      mainLink: "Oct 20 - Oct 22", relativeURL: "Oct_20_-_Oct_22", isSelected: true, showSubLinks: false, subLinks: [
        {
          link: "Project_Setup",
          part: "Project Setup",
          contents: [
            {
              h3: "Project Setup",
              p: "By the beginning of Oct 20, 2025, I have decided to build an e-commerce website, displaying different hardware products that users' need."
            },
            {
              img: ["./Documentations/Home/REFERENCE_1.png"],
              p: "Before I start coding it, I look for some references and sample UIs so that, I can make ideas on how I can build my e-commerce site and how I will display my data with a user-friendly UI and stunning animations. At this point, I tried to sketch a basic hero section of my home page including navigation bar, strong tagline and a paragraph displayed as a box."
            }
          ]
        },
        {
          link: "BryTech's_Tab_Lists:",
          part: "BryTech's Tab Lists:",
          contents: [
            {
              h4: "BryTech's Tab Lists:",
              li: ["1. Home Page", "2. Shop Page", "3. Cart Page", "4. BotBry Page", "5. About Page", "6. Documentation(Docs) Page"]
            },
            {
              img: ["./Documentations/Home/FOLDER_STRUCTURE_1.png", "./Documentations/Home/FOLDER_STRUCTURE_2.png"],
              h1: "Project's Folder Setup",
              p: "In Oct 21, I started to create my E-commerce Website's Folder and created the initial files and name it based on what component of UI it belongs."
            }
          ]
        },
        {
          link: "Designing_&_Coding_Home_Tab",
          part: "Designing & Coding Home Tab",
          contents: [
            {
              img: ["./Documentations/Home/HOME PAGE 1.JPG", "./Documentations/Home/HOME PAGE 1 NIGHT MODE.JPG", "./Documentations/Home/HOME PAGE 2.JPG", "./Documentations/Home/HOME PAGE 3.JPG"],
              h3: "Designing & Coding Home Tab",
              p: "In October 22, after I created the layout of my Home Tab, I start to put all of my ideas into code and develop the home tab quickly so that I can make dark theme as well as the mobile version of the Home Tab."
            }
          ]
        },
      ]
    },
    {
      mainLink: "Oct 23 - Oct 25", relativeURL: "Oct_23_-_Oct_25", isSelected: true, showSubLinks: false, subLinks: [
        {
          link: "Creating_The_Structure_&_UI",
          part: "Creating The Structure & UI",
          contents: [
            {
              h3: "Creating The Structure & UI",
              p: "During Oct 23 to Oct 25, I look for some reference on how I can display my products. After I researched for some references, I decided and layout my shop tab where my products will be displayed. ",
              img: ["./Documentations/Shop/REFERENCE_1.png", "./Documentations/Shop/REFERENCE_2.png"]
            },
            {
              p: "At first, I started to develop the HTML structure, which is the backbone of my shop tab and arrange the necessary elements such as <div> tags which serve as a container and make it a card-like when I style it using CSS.",
              img: ["./Documentations/Shop/SHOP_CODE_1.png", "./Documentations/Shop/SHOP_CODE_2.png"]
            }
          ]
        },
        {
          link: "JSON_Data_Collection",
          part: "JSON Data Collection",
          contents: [
            {
              h4: "JSON Data Collection",
              p: "During Oct 24, I started to collect data about the products that I am going to display and used openAI's chatGPT to generate real products and JSON files which contains the product's data.",
            },
            {
              p: "The JSON(Javascript Object Notayion) file is a file similar to JS(Javascript) but it contains arrays, objects, strings and numbers, in short, it is a data container where you are going to define and name your variables and put the value for it.",
              img: ["./Documentations/Shop/JSON_1.png", "./Documentations/Shop/JSON_2.png"]
            }
          ]
        },
        {
          link: "Fetching_JSON_file",
          part: "Fetching JSON file",
          contents: [
            {
              h3: "Fetching JSON file",
              p: "After finding the products that I need, I have successfully put it in my public folder which is a folder that contains all of the data and pictures that I need to display in my website.",
              img: ["./Documentations/Shop/SHOP PAGE 1.JPG", "./Documentations/Shop/SHOP PAGE 2 PRODUCT DETAILS.JPG", "./Documentations/Shop/SHOP PAGE 2 PRODUCT DETAILS.JPG", "./Documentations/Shop/SHOP PAGE 3 SEARCH BAR.JPG", "./Documentations/Shop/SHOP PAGE 4 ADDED TO CART.JPG"]
            }
          ]
        },
        {
          link: "Errors_and_Bugs",
          part: "Errors and Bugs",
          contents: [
            {
              h3: "Errors and Bugs",
              p: "While making shop page functional, I encountered big and small problems that slowed my time to finish this tab It took me 1 day to make the  the shop fully functional and polished.",
              img: ["./Documentations/Shop/ERROR_1.png", "./Documentations/Shop/ERROR_2.png"]
            }
          ]
        },
      ]
    },
    {
      mainLink: "Oct 26 - Oct 27", relativeURL: "Oct_26_-_Oct_27", isSelected: true, showSubLinks: false, subLinks: [
        {
          link: "Challenges_and_Limitations:",
          part: "Challenges and Limitations:",
          contents: [
            {
              h3: "Challenges and Limitations:",
              p: "After I successfully created and made the shop tab to be functional, another challenge is that how I can connect the shop's tab data to my cart tab. The first challenge I had encounter is how I update my data in realtime while displaying it in the UI.",
              img: ["./Documentations/Cart/CART PAGE 1.JPG", "./Documentations/Cart/CART PAGE 2 PAYMENT METHOD PAGE.JPG"]
            },
            {
              p: "I made a simple database using the 'Local Storage' that the client side provides. 'localStorage' is a built-in web storage object in browsers that allows you to store key–value pairs of data on the client side (in the user's browser). Unlike cookies, this data is not sent to the server automatically with every request.",
              img: ["./Documentations/Cart/STORAGE_1.png", "./Documentations/Cart/STORAGE_2.png"]
            }
          ]
        },
        {
          link: "Shoppee_&_Lazada_UI_as_References",
          part: "Shoppee & Lazada UI as References",
          contents: [
            {
              h4: "Shoppee & Lazada UI as References",
              p: "By observing and searching for UI references, I decided to just go to the Lazada's and Shoppee's UI so that I can get an idea on how my cart tab will be going to look like.",
            },
            {
              p: "It took me 2 hours to make both HTML structure and CSS styling for my cart tab, my cart tab includes items on the cart and the items that are purchased. ",
              img: ["./Documentations/Cart/REFERENCE_1.png", "./Documentations/Cart/REFERENCE_2.png"]
            }
          ]
        },
        {
          link: "Polishing_and_Final_Touch",
          part: "Polishing and Final Touch",
          contents: [
            {
              h3: "Polishing and Final Touch",
              p: "In October 27, I have successfully developed my cart tab and make it functional so that the data can be displayed already and tested in the UI or in the client side server.",
              img: ["./Documentations/Cart/CART_1.png", "./Documentations/Cart/CART_2.png", "./Documentations/Shop/CART_3.png"]
            }
          ]
        },
      ]
    },
    {
      mainLink: "Oct 28 - Oct 30", relativeURL: "Oct_28_-_Oct_30", isSelected: true, showSubLinks: false, subLinks: [
        {
          link: "Gemini_API_Setup_and_Setting_Server_Up",
          part: "Gemini API Setup and Setting Server Up",
          contents: [
            {
              h3: "Gemini API Setup and Setting Server Up",
              p: "After learning how to connect and integrate Google'e Gemini API to HTML and JS, all I need is just to copy paste my previous project and put it in my E-commerce website, but that is where the countless bugs and problems comes.",
              img: ["./Documentations/Shop/REFERENCE_1.png", "./Documentations/Shop/REFERENCE_2.png"]
            },
            {
              p: "I made a simple database using the 'Local Storage' that the client side provides. 'localStorage' is a built-in web storage object in browsers that allows you to store key–value pairs of data on the client side (in the user's browser). Unlike cookies, this data is not sent to the server automatically with every request.",
              img: ["./Documentations/Shop/SHOP_CODE_1.png", "./Documentations/Shop/SHOP_CODE_2.png"]
            }
          ]
        },
        {
          link: "Improving_UI_and_Functions",
          part: "Improving UI and Functions",
          contents: [
            {
              h4: "Improving UI and Functions",
              p: "I reset-up my project after I connect it to my E-commerce website and download the necessary packages and modules so that I can beautify the responses of my AI and display it in the UI.",
            },
            {
              p: "Because of polishing and beautifying the BotBry tab, countless bugs and minor issues pops up because of the new feature of the AI which is saving the previous chats that the users conversation with BotBry . ",
              img: ["./Documentations/BotBry/BOTBRY PAGE 1 INTRO.JPG", "./Documentations/BotBry/BOTBRY PAGE 2.JPG", "./Documentations/BotBry/BOTBRY PAGE 3 response.JPG"]
            }
          ]
        },
        {
          link: "Testing_and_Debugging",
          part: "Testing and Debugging",
          contents: [
            {
              h3: "Testing and Debugging",
              p: "It took me 1 whole day to fix bugs and minor problems that hinges the overall function of my project when publishing it into github and making it accessible in browsers and different devices.",
              img: ["./Documentations/BotBry/ERROR_1.png", "./Documentations/BotBry/ERROR_2.png"]
            }
          ]
        },
      ]
    },
  ])
  const [showSideBar, setShowSideBar] = useState(true)
  const [docsLoading, setDocsLoading] = useState(false)
  const [sections, setSections] = useState([])

  function defineDocsLink(param) {
    setLinks(prev => prev.map((mainLink) => {
      if (param == mainLink.relativeURL) {
        return { ...mainLink, isSelected: true, showSubLinks: true }
      } else return { ...mainLink, isSelected: false, showSubLinks: false }
    }))
  }

  useEffect(() => {
    if (defineTab) {
      defineTab("/Docs")
    }
  }, [defineTab])

  useEffect(() => {
    if (subLink) {
      defineDocsLink(subLink)
    } else {
      defineDocsLink("Oct_20_-_Oct_22")
      navigation("/Docs/Oct_20_-_Oct_22")
    }
  }, [subLink])

  // function DocsLoading() {
  //   return <div className={docsLoading ? s.docsLoading : `${s.docsLoading} ${s.hideLoading}`}>

  //     <div className={s.wrapper}>
  //       <div className={s.loadingBar}></div>
  //       <p>Loading Modules, Please Wait...</p>
  //     </div>
  //   </div>
  // }

  return (
    <>
      {/* <DocsLoading /> */}
      <div className={lightMode ? s.docs : `${s.docs} ${s.darkDocs}`}>
        <SideBar
          links={links} setLinks={setLinks}
          showSideBar={showSideBar} setShowSideBar={setShowSideBar}
          sections={sections} setSections={setSections} />
        <Contents
          links={links} setLinks={setLinks}
          sections={sections} setSections={setSections}
          subLink={subLink}
          setDocsLoading={setDocsLoading} />
      </div>
    </>
  )
}

export default Docs