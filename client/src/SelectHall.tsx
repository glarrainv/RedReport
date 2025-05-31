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
  const NDHalls: { [key: string]: string } = {
    Alumni: "Dorm",
    Badin: "Dorm",
    Baumer: "Dorm",
    "Breen-Phillips": "Dorm",
    Carroll: "Dorm",
    Cavanaugh: "Dorm",
    "Coleman Morse": "Academic Building",
    Dillon: "Dorm",
    Duncan: "Dorm",
    "Duncan Student Center": "Student Building",
    Dunne: "Dorm",
    Farley: "Dorm",
    Fisher: "Dorm",
    Flaherty: "Dorm",
    Graham: "Dorm",
    Hesburgh: "Academic Building",
    Howard: "Dorm",
    "Johnson Family": "Dorm",
    Keenan: "Dorm",
    Keough: "Dorm",
    Knott: "Dorm",
    Lewis: "Dorm",
    Lyons: "Dorm",
    McGlinn: "Dorm",
    Morrissey: "Dorm",
    "O Neill": "Dorm",
    "Pasquerilla East": "Dorm",
    "Pasquerilla West": "Dorm",
    Ryan: "Dorm",
    Siegfried: "Dorm",
    Sorin: "Dorm",
    "St. Edward's": "Dorm",
    Stanford: "Dorm",
    Walsh: "Dorm",
    "Welsh Family": "Dorm",
    Zahm: "Dorm",
  };

  const [Hall, SetHall] = useState<string>("");
  const [Type, SetType] = useState<number>();
  const [InstH, SetInstH] = useState<boolean>(false);
  const [Complete, SetComplete] = useState<boolean>(false);
  var CurrentHalls: Array<string> = [];
  var First = true;
  var Halls = Object.keys(NDHalls);

  function CreateHallList(
    hall: string,
    list: HTMLElement | null,
    e: HTMLInputElement
  ) {
    const item = document.createElement("div");
    item.id = hall;
    item.innerHTML = `${hall} (${NDHalls[hall]})`;
    item.onclick = () => {
      e.value = hall;
      SetHall(hall);
      CompleteHall(hall);
      while (list?.firstChild) {
        list.firstChild.remove();
      }
    };
    list?.appendChild(item);
  }
  function ForceDeleteHalls() {
    var list = document.getElementById("list");
    if (CurrentHalls.length == Halls.length || Complete) {
      console.log("Deleting");
      while (list?.firstChild) {
        list.firstChild.remove();
      }
      CurrentHalls = [];
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
      if (e.value.length == 0 && !CurrentHalls.includes(hall)) {
        CurrentHalls.push(hall);
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
    CurrentHalls = [];
    console.log(CurrentHalls);
    while (list?.children.length != 0) {
      list?.firstChild?.remove();
    }
    for (var hall of Halls) {
      var HallBool = true; //Needs to be pushed
      var Complete = true;
      var cleanhall = hall.replace(/[^a-zA-Z0-9]/g, "");
      for (let char = 0; char < inputhall.length; char++) {
        if (
          inputhall.length > cleanhall.length ||
          inputhall[char].toLocaleLowerCase() !=
            cleanhall[char].toLocaleLowerCase()
        ) {
          HallBool = false;
          Complete = false;
        } else if (
          inputhall.length < cleanhall.length ||
          inputhall[char].toLocaleLowerCase() !=
            cleanhall[char].toLocaleLowerCase()
        ) {
          Complete = false;
        }
      }
      if (inputhall.length == 0) {
        Complete = false;
      }
      if (HallBool == true) CurrentHalls.push(hall);
      if (Complete == true) CompleteHall(hall);
    }
    for (var hall of CurrentHalls) {
      if (list?.children.namedItem(hall) == null) {
        CreateHallList(hall, list, e);
      }
    }
  }
  //Handle visuals when a dorm is selected
  function CompleteHall(hall: string) {
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
      const response = await fetch("https://red-report.vercel.app/api/upload", {
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
      </div>
      <div
        onClick={() => {
          Inst();
        }}
        className="circle largec"
      ></div>
      <div className="autocomplete">
        <label htmlFor="report" id="DormQ">
          <b>Where did you feel unsafe?</b>
        </label>
        <div
          className="abs overlay animate__animated animate__fadeInDown animate__delay-1s"
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
        </div>
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
    </>
  );
}

export default App;
