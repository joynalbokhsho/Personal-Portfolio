window.addEventListener('load', function() {
    
    const socket = new WebSocket("wss://api.lanyard.rest/socket");
    socket.onopen = (event) => {
        setInterval(() => {
            socket.send(JSON.stringify({
                op: 3
            }))
        }, 30000);
    };

    // Set up an event listener for incoming messages
    socket.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        //console.log(receivedData)

        if(receivedData.op === 1) {
            const initialData = {
                op: 2,
                d: {
                    subscribe_to_ids: ["466182014614372362"],
                },
            };
            return socket.send(JSON.stringify(initialData));
        }

        if(receivedData.op === 0) {

            let userdata;
            if(receivedData.t == "INIT_STATE") userdata = receivedData.d['466182014614372362']
            if(receivedData.t == "PRESENCE_UPDATE") userdata = receivedData.d

            /*Avatar*/
            let discord_avatar = document.getElementById("discordAvatar")
            discord_avatar.innerHTML = `<img draggable="false" src="https://cdn.discordapp.com/avatars/${userdata.discord_user.id}/${userdata.discord_user.avatar}.png?size=4096" srcset="" width="80" class="activity_${userdata.discord_status}">`


            //let discord_avatar = document.getElementById("discordAvatar")
            //discord_avatar.src = `https://cdn.discordapp.com/avatars/${userdata.discord_user.id}/${userdata.discord_user.avatar}.png?size=4096`


            let discord_avataricon = document.getElementById("discordAvataricon")
            discord_avataricon.href = `https://cdn.discordapp.com/avatars/${userdata.discord_user.id}/${userdata.discord_user.avatar}.png?size=4096`


            /*Custom*/
            let discord_status = document.getElementById("discordStatus")
            discord_status.className = `${userdata.discord_status}`

            let discord_aboutme = document.getElementById("aboutme")
            discord_aboutme.innerHTML = `${userdata.kv.aboutme}`
            
            /*Email*/
            let discord_email = document.getElementById("email")
            discord_email.innerHTML = `<a href="mailto:${userdata.kv.email}" class="contact-link">${userdata.kv.email}</a>`

            /*Phone*/
            let discord_phone = document.getElementById("phone")
            discord_phone.innerHTML = `<a href="tel:${userdata.kv.phone}" class="contact-link">${userdata.kv.phone}</a>`


            /*Location*/
            let discord_location = document.getElementById("location")
            discord_location.innerHTML = `<address>${userdata.kv.location}</address>`

            /*Birthday*/
            let discord_birthday = document.getElementById("birthday")
            discord_birthday.innerHTML = `<time datetime="2001-12-25">${userdata.kv.birthday}</time>`
            
            /*Affiliate*/
            let discord_affiliate = document.getElementById("affiliate")
            discord_affiliate.innerHTML = `${userdata.kv.affiliate}`

            let discord_cv = document.getElementById("cvdl")
            discord_cv.innerHTML = `${userdata.kv.cvdl ? `<a href="${userdata.kv.cvdl}" target="_blank"><b style="color: white;">Download</b></a>`  : ''}`
            /*
            let activity = document.getElementById("activity")
            activity.className = `activity_${userdata.discord_status}`

            //background image
            const body = document.querySelector("body");
            body.style.backgroundImage = `url(${userdata.kv.bgimg})`;
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundAttachment = "fixed";
            body.style.backgroundSize = "cover";
            body.style.color = "#1a1a1a";
            body.style.fontFamily = "'Poppins', sans-serif";

            */

                        let discord_status_text = document.getElementById("discordstatustext");

            // Replace 'status' with the actual Discord status you have in your 'userdata' object
            let status = userdata.discord_status;
            let statusText = status;

            if (status === 'online') {
                statusText = 'Online';
                discord_status_text.style.color = 'green';
            } else if (status === 'idle') {
                statusText = 'Idle (AFK)';
                discord_status_text.style.color = 'yellow';
            } else if (status === 'dnd') {
                statusText = 'Do Not Disturb (Busy)';
                discord_status_text.style.color = 'red';
            } else if (status === 'offline') {
                statusText = 'Offline on Discord';
                discord_status_text.style.color = 'gray';
            }

            discord_status_text.innerHTML = `<p class="title">${statusText}</p>`;
            


            /*#${userdata.discord_user.discriminator}*/
            let discord_tag = document.getElementById("discordTag")
            discord_tag.innerText = `${userdata.discord_user.username}`

            //for clipboard
            discord_tag.addEventListener('click', () => {
                const textToCopy = discord_tag.innerText;
                navigator.clipboard.writeText(textToCopy)
                  .then(() => {
                    const popup = document.createElement('div');
                    popup.innerHTML = 'Username copied to clipboard';
                    popup.style.position = 'fixed';
                    popup.style.bottom = '20px';
                    popup.style.right = '20px';
                    popup.style.padding = '10px';
                    popup.style.backgroundColor = '#fff';
                    popup.style.border = '1px solid #ccc';
                    popup.style.borderRadius = '5px';
                    document.body.appendChild(popup);
                    setTimeout(() => {
                      document.body.removeChild(popup);
                    }, 2000);
                  })
                  .catch(err => console.error('Could not copy text: ', err))
              });

            let discord_name = document.getElementById("discordname")
            discord_name.innerHTML = `<h1 class="name" title="Joynal Bokhsho">${userdata.discord_user.display_name}<p style="font-size: 14px;">(Jo Jo)</p></h1> `

            
            //my custom edited element
            let discord_Rpc = document.getElementById("rpc");
            if (userdata.activities[1]) {
              const appId = userdata.activities[1].application_id;
              // old one = let largeImage = userdata.activities[1].assets.large_image;
              let largeImage = (userdata.activities[1].assets && userdata.activities[1].assets.large_image) ? userdata.activities[1].assets.large_image : '';
              if (largeImage.startsWith("mp:")) {
                largeImage = largeImage.slice(3); // Remove "mp:" from the beginning
              }
              const primaryUrl = `https://cdn.discordapp.com/app-assets/${appId}/${largeImage}.png`;
              const fallbackUrl = `https://media.discordapp.net/${largeImage}`;
              const altUrl = userdata.spotify?.album_art_url ?? 'fallback-url';
              const activityName = userdata.activities[1].name;
              if (activityName === "Facebook") {
                textColor = "#3b5998";
              } else if (activityName === "Instagram") {
                textColor = "#c13584";
              } else if (activityName === "YouTube") {
                textColor = "red";
              } else if (activityName === "Zoro.to") {
                textColor = "#28b61b";
              } else if (activityName === "Spotify") {
                textColor = "green";
              } else if (activityName === "Minecraft Launcher") {
                textColor = "green";
              } else if (activityName === "VALORANT") {
                textColor = "#FF4654";
              } else {
                textColor = "white";
              }
                         
              discord_Rpc.innerHTML = `<li class="service-item">

              <div class="service-icon-box">
              ${((activityName === "Spotify") || (activityName === "YouTube")) ? `<img src="${primaryUrl || altUrl}" alt="${activityName}" style="width: 72px; height:72px;" draggable="false" class="cd-container cd roundimg">` : `<img src="${primaryUrl || altUrl}" alt="${activityName}" width="40" draggable="false">`}
              </div>

              <div class="service-content-box">
                <h4 class="h4 service-item-title">${activityName ? `<h3 style="color:${textColor}">${activityName}</h3>` : ''}</h4>

                <p class="service-item-text">
                <!-- For 32 Character //${userdata.activities[1].details ? `<p style="color:gray;">${userdata.activities[1].details.slice(0, 35)}${userdata.activities[1].details.length > 35 ? '......' : ''}</p>` : ''} -->
                ${userdata.activities[1].details ? `<p style="color:gray;">${userdata.activities[1].details.split(' ').reduce((acc, val, i) => {
                  if (i % 5 === 0 && i > 0) {
                    return `${acc} <br> ${val}`;
                  }
                  return acc ? `${acc} ${val}` : val;
                }, '')}</p>` : ''}
                                
                ${userdata.activities[1].state ? `<p style="color:gray;">${userdata.activities[1].state}</p>`  : ''}
                ${userdata.activities[1].timestamps?.start ? `<p id="timer" style="color:gray;"></p>` : ''}
                <p class="song-remaining" style="color:gray;"></p>
                </p>
              </div>

            </li>`;

              const img = discord_Rpc.querySelector("img");
              img.onerror = function() {
                img.src = fallbackUrl;
                img.onerror = function() {
                  img.src = altUrl;
                  img.onerror = function() {
                    img.src = `${userdata.kv.bkurl}`;
                  }
                }
              };
            
              if (userdata.activities[1] && userdata.activities[1].timestamps && userdata.activities[1].timestamps.start) {
                const startTime = new Date(userdata.activities[1].timestamps.start);
                const timerElem = document.getElementById("timer");
            
                function updateTimer() {
                  const now = new Date();
                  const diff = now.getTime() - startTime.getTime();
                  const hours = Math.floor(diff / (1000 * 60 * 60));
                  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                  const formattedHours = hours.toString().padStart(2, '0');
                  const formattedMinutes = minutes.toString().padStart(2, '0');
                  const formattedSeconds = seconds.toString().padStart(2, '0');
                  timerElem.innerHTML = `<p>${formattedHours}:${formattedMinutes}:${formattedSeconds} Elapsed</p>`;
                }
            
                updateTimer();
                setInterval(updateTimer, 1000);
              }
            } else {
              discord_Rpc.innerHTML = `<!--${userdata.kv.rpc} <br> ${userdata.kv.musicoff}-->`;
            }
            
            /*
            

            // custom edited element

            //let spotify_activity = document.getElementById("spotifyActivity");
            //if (userdata.listening_to_spotify) {
              //spotify_activity.innerHTML = `
              //<i class="fab fa-spotify"></i> I am currently listening: <br> 
               //<b style="color:cyan;">Song Name:</b> <a target="_blank" href="https://open.spotify.com/track/${userdata.spotify.track_id}"><b style="color:white;" class="animated-fade">${userdata.spotify.song}</b></a> <br>
               //<b style="color:cyan;">Artist Name:</b> <b style="color:white;" class="animated-fade">${userdata.spotify.artist}</b> <br>
               //<b style="color:cyan;">Album Name:</b> <b style="color:white;" class="animated-fade">${userdata.spotify.album}</b> <br>
               //<h5 class="song-remaining"></h5>`;
            //} else {
              //spotify_activity.innerHTML = `<!--<i class="fab fa-spotify"></i> I'm not listening to any song right now-->${userdata.kv.musicoff}`;
            //}

            //spotify avatar


            //main album url 
            //let sp_album_url = document.getElementById("spalbumurl");
            //if (userdata.listening_to_spotify) {
                //sp_album_url.innerHTML = `<!--<a target="_blank" href="https://open.spotify.com/track/${userdata.spotify.track_id}"><img draggable="false" src="${userdata.spotify.album_art_url}" alt="${userdata.spotify.song}" srcset="" style="width: auto; height:50px;" class="cd-container cd"></a>-->`;
            //} else {
                //sp_album_url.innerHTML = `<!--<i class="fab fa-spotify"></i> No Avatar Available Right now -->`;
            //}


            //spotify avatar
            //spotify old data
            //if(userdata.listening_to_spotify) {
            //    let spotify_activity = document.getElementById("spotifyActivity")
            //    spotify_activity.innerHTML = `<i class="fab fa-spotify"></i> Listening to: ${userdata.spotify.song} - ${userdata.spotify.artist}`
            //}

            let status_activity = document.getElementById("statusActivity")

            let status = userdata.activities.filter(a => a.name == "Custom Status")
            if(status.length > 0) {
                status_activity.innerHTML = `${status[0].emoji?.id ? `<p><u>Discord Status</u></p><br><img draggable="false" id="statusEmoji" src="https://cdn.discordapp.com/emojis/${status[0].emoji.id}.${status[0].emoji.animated ? 'gif' : 'png'}?size=28">` : ''} <br> <b>${status[0].state ? `<i>${status[0].state}</i>`: ''}</b>`
            }
            else {
                status_activity.innerHTML = `Feeling Good Ig`;
            }


            let discord_motd = document.getElementById("motd");
            if (userdata.kv.motd) {
                discord_motd.innerHTML = userdata.kv.motd;
            } else {
                discord_motd.style.display = '';
            }
            
            let discord_custom = document.getElementById("custom");
            if (userdata.kv.custom) {
                discord_custom.innerHTML = userdata.kv.custom;
            } else {
                discord_custom.style.display = '';
            }
            
            // music time converter
            function updateRemainingTime() {
              const now = new Date().getTime();
              const spotifyData = userdata.spotify;
              if (spotifyData) { // check if userdata.spotify is not null
                  const start = spotifyData.timestamps.start;
                  const end = spotifyData.timestamps.end;
                  const duration = end - start;
                  const elapsed = now - start;
                  const remaining = duration - elapsed;
                  const remainingSeconds = Math.floor(remaining / 1000);
                  let timeString = '';
          
                  // Check if hours are available
                  if (remaining >= 3600000) {
                      const remainingHours = Math.floor(remaining / 3600000);
                      const remainingMinutes = Math.floor((remaining % 3600000) / 60000);
                      timeString = `${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`;
                      if (remainingMinutes > 0) {
                          timeString += ` ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
                      }
                      timeString += '';
                  }
                  // Check if minutes are available
                  else if (remaining >= 60000) {
                      const remainingMinutes = Math.floor(remaining / 60000);
                      const remainingSecondsInMinute = remaining % 60000 / 1000;
                      timeString = `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
                      if (remainingSecondsInMinute > 0) {
                          timeString += ` ${Math.floor(remainingSecondsInMinute)} second${Math.floor(remainingSecondsInMinute) !== 1 ? 's' : ''}`;
                      }
                      timeString += '';
                  }
          
                  // Display remaining seconds
                  else if (remainingSeconds > 0) {
                      timeString = `${Math.floor(remainingSeconds)} second${Math.floor(remainingSeconds) !== 1 ? 's' : ''}`;
                  }
          
                  const songRemaining = document.querySelector('.song-remaining');
                  songRemaining.innerHTML = timeString ? `<!--<p style="color:cyan;">--> <!--<b  style="color:white;">-->${timeString} remaining<!--</b></p>-->` : '';
              }
          }
          
          // Call the updateRemainingTime function every second
          setInterval(updateRemainingTime, 1000);
                              
              */
            console.log(userdata)

        }

        // Use the received JSON data to modify HTML elements
        // Assuming the received data has a property called 'content' that needs to be displayed
        // if (receivedData.content) {
        //   elementToUpdate.innerHTML = receivedData.content;
        // }
    };

    window.onbeforeunload = () => {
        socket.onclose = () => {}; // Disable onclose handler first
        socket.close();
    };

})