// To create the query endpoint for the task one.

exports.getQuery = async (req, res) => {
    try {
      const slackName = req.query.slack_name;
      const track = req.query.track;
  
      const githubFileURL =
        "https://github.com/GodsentMichael/HNG-backend-tasks/blob/main/controllers/taskOneCntrl.js";
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
  
      // Get the current UTC time
      const currentUTCTime = new Date().toISOString();
      const currentTimeInMilliseconds = Date.parse(currentUTCTime);
  
      // Validate UTC time within +/-2 hours (i.e., 7,200,000 milliseconds)
      const allowedRange = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      const isCurrentTimeWithinRange = (currentTimeInMilliseconds - allowedRange) <= currentTimeInMilliseconds <= (currentTimeInMilliseconds + allowedRange);
  
      if (!isCurrentTimeWithinRange) {
        throw new Error('Current time is not within the allowed range of +/-2 hours');
      }
  
      const response = {
        slack_name: slackName,
        current_day: currentDay,
        utc_time: currentUTCTime,
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
  