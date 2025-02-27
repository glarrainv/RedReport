import { useState } from "react";
import "./App.css";
import React from "react";

function App() {
  const NDHalls: { [key: string]: boolean } = {
    Alumni: true,
    Badin: true,
    Baumer: true,
    "Breen-Phillips": true,
    Carroll: true,
    Cavanaugh: true,
    Dillon: true,
    Duncan: true,
    Dunne: true,
    Farley: true,
    Fisher: true,
    Zahm: true,
    Flaherty: true,
    Graham: true,
    Howard: true,
    "Johnson Family": true,
    Keenan: true,
    Keough: true,
    Knott: true,
    Lewis: true,
    Lyons: true,
    McGlinn: true,
    Morrissey: true,
    "O'Neill": true,
    "Pasquerilla East": true,
    "Pasquerilla West": true,
    Ryan: true,
    Siegfried: true,
    Sorin: true,
    "St. Edward's": true,
    Stanford: true,
    Walsh: true,
    "Welsh Family": true,
  };

  const [Hall, SetHall] = useState<string>("");
  const [Type, SetType] = useState<number>(0);
  function AutoCompleteHall(e: HTMLInputElement) {
    var list = document.getElementById("list");
    while (list?.firstChild) {
      list.firstChild.remove();
    }

    const HallKeys = Object.keys(NDHalls);
    for (var hall of HallKeys) {
      for (let char = 0; char < e.value.length; char++) {
        if (e.value[char] == hall[char]) {
          if (NDHalls[hall] == false) {
            NDHalls[hall] = true;
          }
        } else {
          if (NDHalls[hall] == true) {
            NDHalls[hall] = false;
            break;
          } else {
          }
          break;
        }
      }
    }

    for (var hall of HallKeys) {
      if (list?.children.namedItem(hall) == null && NDHalls[hall] == true) {
        document.getElementsByName("dorm");
        const item = document.createElement("div");
        item.id = hall;
        item.innerHTML = hall;
        item.onclick = () => {
          e.value = item.id;
          SetHall(item.id);
          while (list?.firstChild) {
            list.firstChild.remove();
          }
        };
        list?.appendChild(item);
      }
    }
    if (e.value.length == 0) {
      while (list?.firstChild) {
        list.firstChild.remove();
      }
    }
  }
  const addData = async (e: string) => {
    if (!e) {
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

      if (!response.ok) throw new Error("Failed to report case");

      const data = await response.json();
      alert("Case reported successfully! Case ID: " + data.id);
    } catch (error) {
      alert("Error: " + error);
    }
  };
  return (
    <>
      <div className="circle"></div>
      <div className="autocomplete">
        <label htmlFor="report">Where did you feel unsafe?</label>
        <input
          id="report"
          type="text"
          name="report"
          placeholder="Alumni"
          onInputCapture={(e) => {
            AutoCompleteHall(e.currentTarget);
          }}
        />
        <div id="list" className="autocomplete-items"></div>
      </div>
      <div className="autocomplete">
        <label htmlFor="report">
          Can you classify the incident into any of the following?
        </label>
        <div className="" id="type">
          <button
            className="purple"
            onClick={() => {
              SetType(0);
            }}
          >
            Uncomfortable Situation
          </button>
          <button
            className="red"
            onClick={() => {
              SetType(1);
            }}
          >
            Sexual Harrasment
          </button>
          <button
            className="orange"
            onClick={() => {
              SetType(2);
            }}
          >
            Physical Agression
          </button>
          <button
            className="yellow"
            onClick={() => {
              SetType(3);
            }}
          >
            Verbal Aggression
          </button>
          <button
            className="black"
            onClick={() => {
              SetType(4);
            }}
          >
            Other Discomfort
          </button>
        </div>
      </div>
      <button
        className="submit"
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
