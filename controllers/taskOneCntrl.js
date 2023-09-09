// To create the query endpoint for the task one.
exports.getQuery = async (req, res) => {
  try {
    const slackName = req.query.slack_name;
    const track = req.query.track;

    const githubFileURL =
      "https://github.com/GodsentMichael/HNG-backend-tasks/blob/main/controllers/taskOneCntrl.js";
    const githubRepoURL =
      "https://github.com/GodsentMichael/HNG-backend-tasks.git";

    // So first get the current day of the week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = daysOfWeek[new Date().getUTCDay()];

    // Then the current UTC time

    // Get the current UTC time
const now = new Date();
now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + 120); // Adjust for UTC+2

// Format UTC time as a string without "T" and "Z"
const utcTime = now.toISOString()
console.log("UTCTIME=>", utcTime)

    // const serverTime = new Date();
    // console.log("serverTime=>", serverTime);
    // const serverUtcTime = new Date(serverTime.toISOString());
    // console.log("serverUtcTime=>", serverUtcTime);

    // Calculate the time difference in milliseconds between server time and UTC time
    // const timeDifference = Math.abs(serverTime - serverUtcTime);
    // console.log("timeDifference=>", timeDifference);

    const response = {
        slack_name: slackName,
        current_day: currentDay,
        utc_time: utcTime,
        track: track,
        github_file_url: githubFileURL,
        github_repo_url: githubRepoURL,
        status_code: 200,
      };

      return res.status(200).json(response)

    // So to Validate UTC time within +/-2 minutes i.e (120,000 milliseconds)
    // if (timeDifference <= 120000) {
    //   const utcTime = serverTime.toISOString();
    //   const response = {
    //     slack_name: slackName,
    //     current_day: currentDay,
    //     utc_time: utcTime,
    //     track: track,
    //     github_file_url: githubFileURL,
    //     github_repo_url: githubRepoURL,
    //     status_code: 200,
    //   };
    //   return res.status(200).json(response);
    // } else {
    //   // Invalid request due to time difference > +/-2 minutes
    //   res.status(400).json({ error: "Time validation failed" });
    // }
  } catch (error) {
    console.error("Get Query Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
