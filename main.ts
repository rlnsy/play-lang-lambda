import { handler } from "./index";

const example = "2021|07|20|0|MIL|2|1|11:40.0|PHO|2021|0|player paulch01 misses 2-pt jump shot from 20 ft";

const example2 = "2021|07|20|0|MIL|5|1|11:20.0|PHO|2021|0|Defensive rebound by player crowdja01";

handler([example, example2]).then(console.log).catch(console.log);
