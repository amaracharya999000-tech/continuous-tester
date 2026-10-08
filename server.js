const express=require("express");
const crypto=require("crypto");
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.static("public",{etag:false,maxAge:0}));

app.get("/api/download",(req,res)=>{
 const total=Math.min(Math.max(Number(req.query.bytes)||5*1024*1024,1024),50*1024*1024);
 res.set({"Content-Type":"application/octet-stream","Content-Length":String(total),"Cache-Control":"no-store"});
 let sent=0;
 function send(){
  if(sent>=total)return res.end();
  const n=Math.min(256*1024,total-sent);
  const chunk=crypto.randomBytes(n);sent+=n;
  if(!res.write(chunk))res.once("drain",send);else setImmediate(send);
 }
 send();
});
app.post("/api/upload",(req,res)=>{
 let n=0;req.on("data",c=>n+=c.length);
 req.on("end",()=>res.json({ok:true,bytes:n}));
 req.on("error",()=>res.destroy());
});
app.listen(PORT,"0.0.0.0",()=>console.log(`Bandwidth tester listening on port ${PORT}`));