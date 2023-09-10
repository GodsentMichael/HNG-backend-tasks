// To create the query endpoint for the task one.

exports.getQuery = async (req, res) => {
    try {
      const slackName = req.query.slack_name;
      const track = req.query.track;
  
      const githubFileURL =
        "https://github.com/GodsentMichael/HNG-backend-tasks/blob/main/public/app.js";
      const githubRepoURL =
        "https://github.com/GodsentMichael/HNG-backend-tasks.git";
  
      // Get the current day of the week
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
  
        // We have to get the current time in UTC
      const now = new Date();

      const utcTime = new Date(now.getTime()).toISOString().split(".")[0]+"Z";

      const response = {
        slack_name: slackName,
        current_day: currentDay,
        utc_time: utcTime,
        track: track,
        github_file_url: githubFileURL,
        github_repo_url: githubRepoURL,
        status_code: 200,
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error("Get Query Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  