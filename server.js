const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public", { etag:false, maxAge:0 }));

// Stream disposable bytes. Nothing is saved to disk/database.
app.get("/api/download", (req,res)=>{
  const total = Math.min(Number(req.query.bytes)||10*1024*1024, 50*1024*1024);
  res.set({
    "Content-Type":"application/octet-stream",
    "Content-Length":String(total),
    "Cache-Control":"no-store, no-cache, must-revalidate"
  });
  const chunk = Buffer.alloc(256*1024, 0xA5);
  let sent=0;
  function send(){
    if(sent>=total){res.end();return;}
    const n=Math.min(chunk.length,total-sent);
    if(!res.write(chunk.subarray(0,n))) res.once("drain",send);
    else setImmediate(send);
  }
  send();
});

// Accept and discard upload bytes. Nothing is stored.
app.post("/api/upload",(req,res)=>{
  let bytes=0;
  req.on("data",chunk=>bytes+=chunk.length);
  req.on("end",()=>res.json({ok:true,bytes}));
  req.on("error",()=>res.destroy());
});

app.listen(PORT,()=>console.log(`Bandwidth tester: http://localhost:${PORT}`));
