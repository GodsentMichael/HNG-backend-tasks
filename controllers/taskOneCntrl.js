// To create the query endpoint for the task one.
exports.getQuery = async (req, res) => {

    try {
        const slackName = req.query.slack_name
        const track = req.query.track
    
        //The current day of the week in an array.
        daysOfTheWeek = ["Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday", "Sunday"]
        currentDay = daysOfTheWeek[new Date().getUTCDay()]
    
          // Get the current UTC time
      const now = new Date();
      now.setMinutes(now.getMinutes() + now.getTimezoneOffset() - 120); // Adjust for UTC+2
      const utcTime = now.toISOString()

        // GitHub URLs
  const githubFileURL = 'https://github.com/username/repo/blob/main/file_name.ext'; 
  const githubRepoURL = "https://github.com/GodsentMichael/HNG-backend-tasks.git"; 

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
        console.error('Get Query Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
   ;

}