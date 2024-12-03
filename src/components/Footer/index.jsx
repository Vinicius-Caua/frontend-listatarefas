import cachorro from "../../assets/cachorro.png";

function Footer() {
  return (
    <div className="bg-dark flex w-full h-24 items-center gap-4 justify-center">
      <img src={cachorro} height={30} width={30} />
      <h1 className="text-white">Direitos reservados.</h1>
    </div>
  );
}

export default Footer;
