var net = require("net");

var banner = require('node-banner');

const { color, log } = require('console-log-colors');
const { red, green, cyan } = color;

var HOST = process.argv[2];

var PORT_START = process.argv[3];

var PORT_END = process.argv[4];

function showBanner()
{
    banner('N3TSC@NN3R', 'Simple port scanner in NODEJS developed by Saif Merchant\r\n Github: https://github.com/merchant862/\r\n\r\n Sample usage: node scanner [url OR ip] [PORT to start with] [PORT to end with]\r\n\r\n Example: node scanner 127.0.0.1 0 65536');
}    

if
(
    HOST == "" && 
    PORT_START == "" && 
    PORT_END == "" && 
    HOST == null && 
    PORT_START == null && 
    PORT_END == null
)
{
   showBanner();
   log.red("Host & Port Range are missing");
   process.exit(1)
}

else if
(
    PORT_START < 0 && 
    PORT_START > 65536 && 
    PORT_END < 0 && 
    PORT_END > 65536
)
{
    showBanner();
    log.red("Port Range should be between 0 - 65536");
    process.exit(1)
}

else
{
   async function scan()
   {
        showBanner();
        for(let x = PORT_START; x <= PORT_END; x++)
        {
            try
            {
                await connect(HOST,x);
                log.green("----------------------------------------------------------")
                log.cyan(`PORT ${x} is OPEN`);
            }
    
            catch(e)
            { 
            }
        }

        process.exit(0)
 
   }

   async function connect(host,port)
   {
       return new Promise((res,rej) =>
       {
           const client = new net.Socket();
           client.connect({host:host,port:port}, () => 
           {
               res(true);
           }).on("error", err =>
           {
               rej(err);
           })
       })
   }

   scan();
}