// Author of the blacklist file: Peter Lowe
// Author of this Project: Itzporium
// The page: https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts;showintro=0
// Not in development anymore because it can cause laggy for ram

module.exports = {
    "get": (callback) => {
        fetch("https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts;showintro=0").then((res_raw) => res_raw.text()).then((res) => {
            const parsedBlacklist = [];
            const parsedRes = res?.toString().split("127.0.0.1")
            
            for (let i = 1; i < parsedRes.length; i++) {
                parsedBlacklist.push(parsedRes[i]?.toString().replace(" ", "").replace("\n", ""))
            }
            
            callback(parsedBlacklist)
        })
    }
}