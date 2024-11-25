import logo from "../assets/logo.png";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center justify-center bg-center p-2">
      <img 
        src={logo} 
        width={width} 
        alt="Logo" 
        className="block max-w-full h-13 rounded-lg"
      />
    </div>
  );
}

export default Logo;
