const https = require('https')



const url = "https://video.prd.funimation.com/FunimationStoreFront/V1715391/b3d0366f-0c39-4cb5-ad4b-0ad30be2fdd0_index.mp4?t=exp=1665935955~acl=https://video.prd.funimation.com/FunimationStoreFront/V1715391/*~hmac=d368ca5728667c293bca2da0e5b5c14a3072d4e12e40e65cf33e5c49e12269e3"

https.get(url, (res) => {
    console.log(res)
    res.on('pipe', (src) => {
        console.log(src)
        src.on('data', (chunk) => {
          console.log(chunk.toString('utf8'));
        });
      });
  });
  