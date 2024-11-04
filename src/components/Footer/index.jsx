import fatto from "../../assets/fatto.png";

function Footer() {
  return (
    <div className="bg-dark flex w-full h-24 items-center gap-4 justify-center">
      <img src={fatto} height={30} width={30} />
      <h1 className="text-white">© FATTO, todos os direitos reservados.</h1>
    </div>
  );
}

export default Footer;
