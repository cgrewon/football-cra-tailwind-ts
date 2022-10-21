import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function LiveLink() {
  return (
    <a
      onClick={()=>{
        window.open("https://www.livescore.in/football/europe/uefa-nations-league/", '', 'toolbar=no,titlebar=no')
      }}
      className="text-green-400 align-middle cursor-pointer"
    >
      LiveIn <ExternalLinkIcon />
    </a>
  );
}
