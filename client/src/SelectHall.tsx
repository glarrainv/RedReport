import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./animateu.css";
function App() {
  const navigate = useNavigate();
  // TO DO:
  // Finish instructions
  // Hashed IP Location NOT MANDATORY
  // Time feature for map
  // Add feautures for testing
  // VIDEO
  // 1. Define the interface for a single location object
  // Define the interface for a single location object with the new 'buildingType' field
  interface CampusLocation {
    name: string;
    location: "Notre Dame" | "Saint Mary's" | "Holy Cross";
    buildingType:
      | "Hall"
      | "Sports Facility"
      | "Academic Building"
      | "Student Building";
  }

  const NDHalls: CampusLocation[] = [
    {
      name: "Le Man's College",
      location: "Saint Mary's",
      buildingType: "Academic Building",
    },
    {
      name: "Science Hall",
      location: "Saint Mary's",
      buildingType: "Academic Building",
    },
    {
      name: "McGrath Institute For Church Life",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "St. Joseph Chapel",
      location: "Holy Cross",
      buildingType: "Academic Building",
    },
    {
      name: "Grotto of Our Lady of Lourdes",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Coleman-Morse Center",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Holy Cross College",
      location: "Holy Cross",
      buildingType: "Academic Building",
    },
    {
      name: "Church of Our Lady of Loretto",
      location: "Saint Mary's",
      buildingType: "Academic Building",
    },
    {
      name: "Alliance for Catholic Education",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Holy Cross Hall",
      location: "Saint Mary's",
      buildingType: "Hall",
    },
    {
      name: "The Graduate School",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "University of Notre Dame School of Architecture",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Notre Dame Law School",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Mendoza College of Business",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Keough School of Global Affairs",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Notre Dame College of Engineering",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Dunne Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Undergraduate Admissions",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Hammes Notre Dame Bookstore",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Notre Dame Stadium",
      location: "Notre Dame",
      buildingType: "Sports Facility",
    },
    {
      name: "Dillon Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Haggar College Center",
      location: "Saint Mary's",
      buildingType: "Student Building",
    },
    {
      name: "St Edwards Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Early Childhood Development Center",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Grace Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Spes Unica Hall",
      location: "Saint Mary's",
      buildingType: "Hall",
    },
    {
      name: "Sorin Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Keenan Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "DeBartolo Hall",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Notre Dame Computer Store",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Carroll Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Saint Mary's Student Center",
      location: "Saint Mary's",
      buildingType: "Student Building",
    },
    {
      name: "Huddle Mart Convenience Store",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Lewis Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Badin Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Baumer Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Howard Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "O'Neill Family Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Stanford Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Ryan Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Flaherty Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Lyons Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Johnson Family Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Siegfried Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Keough Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Morrissey Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Farley Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Walsh Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Duncan Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "University Village",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Pasquerilla West Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Fischer Graduate Housing",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Welsh Family Hall",
      location: "Notre Dame",
      buildingType: "Hall",
    },
    {
      name: "Hesburgh Library",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Moreau Seminary Library",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Chemistry Physics Library",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Music Library",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Library Lawn",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Raclin Murphy Museum of Art",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Smith Center for Recreational Sports",
      location: "Notre Dame",
      buildingType: "Sports Facility",
    },
    {
      name: "North Dome",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Saint Mary's College Angela Athletic Center",
      location: "Saint Mary's",
      buildingType: "Sports Facility",
    },
    {
      name: "Rolfs Aquatic Center",
      location: "Notre Dame",
      buildingType: "Sports Facility",
    },
    {
      name: "Purcell Pavilion",
      location: "Notre Dame",
      buildingType: "Sports Facility",
    },
    {
      name: "Pfeil Center",
      location: "Holy Cross",
      buildingType: "Sports Facility",
    },
    {
      name: "O'Neill Hall of Music",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Legends",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "South Dining Hall",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Traditions",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Garbanzo Mediterranean Fresh @ Hesburgh Center",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "North Dining Hall",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Flip Kitchen",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Cafe commons",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
    {
      name: "Main Building",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "Basilica of the Sacred Heart",
      location: "Notre Dame",
      buildingType: "Academic Building",
    },
    {
      name: "University Health Services",
      location: "Notre Dame",
      buildingType: "Student Building",
    },
  ];

  const [Hall, SetHall] = useState<string>("");
  const [Type, SetType] = useState<number>();
  const [InstH, SetInstH] = useState<boolean>(false);
  const [Complete, SetComplete] = useState<boolean>(false);
  var CurrentHalls: { [key: string]: string } = {};
  var First = true;
  var Halls = Object.keys(NDHalls);

  function CreateHallList(
    hall: string,
    list: HTMLElement | null,
    e: HTMLInputElement
  ) {
    const item = document.createElement("div");
    item.id = hall;
    item.innerHTML = `${hall}`;
    item.onclick = () => {
      e.value = hall;
      SetHall(hall);
      CompleteHall();
      while (list?.firstChild) {
        list.firstChild.remove();
      }
    };
    list?.appendChild(item);
  }
  function ForceDeleteHalls() {
    var list = document.getElementById("list");
    if (Object.keys(CurrentHalls).length == Halls.length || Complete) {
      console.log("Deleting");
      while (list?.firstChild) {
        list.firstChild.remove();
      }
      CurrentHalls = {};
    }
  }
  function ListHalls(e: HTMLInputElement) {
    var list = document.getElementById("list");
    if (First == true) {
      First = false;
      while (list?.firstChild) {
        list.firstChild.remove();
      }
    }
    for (var hall of Halls) {
      if (
        e.value.length == 0 &&
        !Object.values(CurrentHalls).includes(
          hall || NDHalls[hall][0] || NDHalls[hall][1]
        )
      ) {
        CurrentHalls[hall] = hall;
        CreateHallList(hall, list, e);
      }
    }
  }
  function AutoCompleteHall(e: HTMLInputElement) {
    // When changed complete goes back to false
    SetComplete(false);
    e.classList.remove("completehall");
    var inputhall = e.value.replace(/[^a-zA-Z0-9]/g, "");
    var list = document.getElementById("list");
    CurrentHalls = {};
    console.log(CurrentHalls);
    while (list?.children.length != 0) {
      list?.firstChild?.remove();
    }
    for (var hall of Halls) {
      var Continue = true;
      var type = NDHalls[hall][0];
      var school = NDHalls[hall][1];
      if (inputhall.length == 0) {
        console.log("Dead");
        break;
      }
      for (var checking of [hall, type, school]) {
        Continue = true;
        for (let char = 0; char < inputhall.length; char++) {
          if (
            inputhall[char].toLocaleLowerCase() ==
            checking.replace(/[^a-zA-Z0-9]/g, "")[char].toLocaleLowerCase()
          ) {
            console.log("Character good");
            continue;
          }
          Continue = false;
          break;
        }
        if (inputhall.length == checking.length && Continue == true) {
          console.log(checking.replace(/[^a-zA-Z0-9]/g, ""), inputhall);
          SetHall(hall);
          CompleteHall();
        }
        if (Continue == true) {
          CurrentHalls[hall] = checking;
        }
      }
    }
    for (var hall of Object.keys(CurrentHalls)) {
      if (list?.children.namedItem(hall) == null) {
        CreateHallList(hall, list, e);
      }
    }
  }
  //Handle visuals when a dorm is selected
  function CompleteHall() {
    var e = document.getElementById("report");
    e?.classList.add("completehall");
    SetComplete(true);
    console.log("Ran");
  }
  //Submit to Database
  const addData = async (e: string) => {
    if (!Complete) {
      alert("No Hall Selected");
      return;
    }
    try {
      const response = await fetch("https://reddot.report/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Dorm: e,
          Type: Type, // This comes from your state
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to report case");
      }
      navigate("/map");
    } catch (error) {
      alert("Error: " + error);
    }
  };
  function Hide(e: HTMLElement) {
    var x: HTMLCollectionOf<Element> =
      e.ownerDocument.getElementsByClassName("overlay");

    for (const i of x) {
      i.classList.replace("animate__fadeIn", "animate__fadeOut");
      i.classList.replace("animate__fadeInDown", "animate__fadeOut");
    }
  }
  function Inst() {
    console.log("Run");
    var instruction = document.getElementsByClassName("insth");

    for (var i = 0; i < instruction.length; i++) {
      if (InstH == false) {
        instruction[i].setAttribute("style", "display: none !important;");
        instruction[i].classList.replace("animate__fadeIn", "animate__fadeOut");
        SetInstH(true);
      } else {
        instruction[i].setAttribute("style", "display: block !important;");
        instruction[i].classList.replace("animate__fadeOut", "animate__fadeIn");
        SetInstH(false);
      }
    }
  }

  return (
    <>
      <div
        id="underlay"
        onMouseDown={() => {
          ForceDeleteHalls();
        }}
      ></div>
      <div
        id="overlay"
        className="animate__animated animate__fadeIn overlay"
        onClick={(e) => {
          Hide(e.currentTarget);
        }}
      >
        <div className="animate__animated animate__fadeInDown animate__delay-1s">
          <h3>
            <b>Redreport</b> ND Campus Safety Tool
          </h3>
          <h3>
            <b>Instructions</b>
          </h3>
          <p>Believing in your own story carries no shame </p>
          <h6 className="note">Click anywhere to access the form</h6>
        </div>
        <div
          className="abs overlay animate__animated animate__fadeInDown animate__delay-1s cont"
          onClick={(e) => {
            Hide(e.currentTarget);
          }}
        >
          <h6 className="inst rotate">Enter a campus location</h6>
          <img
            className="arrow rotate"
            src="https://raw.githubusercontent.com/CaptainSquid9/RedReport/6058b146b4556500a4988f5214dc23c47a0754b6/client/arrow.svg"
            height={"75px"}
          ></img>
          <input type="text" className="overlay" />
          <div
            className="abs animate__animated animate__fadeInDown animate__delay-1s overlay"
            onClick={(e) => {
              Hide(e.currentTarget);
            }}
          >
            <div className="brackcont">
              <h3 className="bracket">{"}"}</h3>
              <h3 className="inst2">What happened?</h3>
            </div>

            <div className="button yellow disc od"></div>
            <div className="button red disc od"></div>
            <div className="button blue disc od"></div>
            <div className="button purple disc od"></div>
            <div className="button black disc od"></div>
          </div>
        </div>
      </div>
      <div className="cont">
        <div
          onClick={() => {
            Inst();
          }}
          className="circle largec"
        ></div>
        <div>
          <div className="autocomplete">
            <label htmlFor="report" id="DormQ">
              <b>Where did you feel unsafe?</b>
            </label>
            <h6 className="inst insth rotate animate__animated animate__fadeOut">
              Enter a campus location
            </h6>
            <img
              className="arrow rotate insth animate__animated animate__fadeOut"
              src="https://raw.githubusercontent.com/CaptainSquid9/RedReport/6058b146b4556500a4988f5214dc23c47a0754b6/client/arrow.svg"
              height={"75px"}
            ></img>
            <input
              id="report"
              type="text"
              name="report"
              placeholder="Alumni"
              onClick={(e) => {
                ListHalls(e.currentTarget);
              }}
              onInputCapture={(e) => {
                AutoCompleteHall(e.currentTarget);
              }}
            />
            <div id="list" className="autocomplete-items"></div>
          </div>
          <div
            className="autocomplete"
            onMouseDown={() => {
              ForceDeleteHalls();
            }}
          >
            <div id="type" className="col">
              <div className="brackcont insth animate__animated animate__fadeOut">
                <h3 className="bracket">{"}"}</h3>
                <h3 className="inst2">What happened?</h3>
              </div>
              <div>
                <button
                  className="button yellow disc"
                  onClick={() => {
                    SetType(0);
                  }}
                >
                  Uncomfortable Situation
                </button>
                <button
                  className="button red disc"
                  onClick={() => {
                    SetType(1);
                  }}
                >
                  Sexual Harrasment
                </button>
                <button
                  className="button blue disc"
                  onClick={() => {
                    SetType(2);
                  }}
                >
                  Physical
                </button>

                <button
                  className="button purple disc"
                  onClick={() => {
                    SetType(3);
                  }}
                >
                  Verbal Aggression
                </button>
                <button
                  className="button black disc"
                  onClick={() => {
                    SetType(4);
                  }}
                >
                  Discrimination
                </button>
              </div>
            </div>
          </div>
          <button
            className="submit button"
            onClick={() => {
              addData(Hall);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
