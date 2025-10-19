import "./App.css";
import { useCallback, useState, useRef, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  useEffect(() => {
    passwordGenerator();
  }, [length, allowChar, allowNumber, setPassword]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNumber) str += "0123456789";
    if (allowChar) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, allowChar, allowNumber]);

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.style.backgroundColor === "back";
      passwordRef.current.style.backgroundColor==="";
      document.execCommand("copy");
      alert("Password copied to clipboard!");
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center text-2xl mb-4">
        Password Generator
      </h1>
      <div className="flex items-center bg-gray-700 rounded mb-4">
        <input
          type="text"
          value={password}
          ref={passwordRef}
          className="outline-none w-full py-2 px-3 bg-gray-700 text-white rounded-l"
          placeholder="Your Password"
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col space-y-3 text-white mb-4">
        <label className="flex justify-between items-center">
          <span>Password Length: {length}</span>
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-1/2 ml-3"
          />
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={allowNumber}
            onChange={() => setAllowNumber((prev) => !prev)}
            className="mr-2"
          />
          Include Numbers
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={allowChar}
            onChange={() => setAllowChar((prev) => !prev)}
            className="mr-2"
          />
          Include Special Characters
        </label>
      </div>
    </div>
  );
}

export default App;
