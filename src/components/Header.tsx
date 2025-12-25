export default function Header() {
  // const [time, setTime] = useState("");
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

  // useEffect(() => {
  //   const showTime = () => {
  //     const timeString = new Date().toLocaleTimeString();
  //     // return timeString;
  //     setTime(timeString);
  //   };
  //   const intervalId = setInterval(showTime, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="flex justify-between">
      <img src="/7essabat_app_logo.png" alt="logo" className="w-15" />
      {/* {date + time} */}
      <div className="flex flex-col text-white font-bold text-sm justify-center items-center gap-1.5">
        {/* date */}
        <p className="text-sm">{formattedDate}</p>
        {/* <p className="text-xs">{time}</p> */}
      </div>
    </div>
  );
}
