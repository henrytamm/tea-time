# `<tea time>`
Tea Time is a personal project and my take on creating a live chat application that features servers, channels and live messaging. 

### Features
* Servers
  * Create new servers
  * Edit existing servers
  * Delete existing servers
  * An explore page for every server where you can freely join

* Channels
  * Create a new text channel in a server
  * Edit an existing channel
  * Delete an existing channel

* Live messaging
  * Ability to send live messages in a server/channel


### Technologies Used
* Python
* Flask
* SQLAlchemy
* Sqlite3
* AWS
* Sockets
* React
* Redux
* Html5
* Css
* Git
* Javascript


### Setting up the application
* Open up a terminal and navigate to the folder you would like the files to be in
* Type git clone then hit space and paste the url "git clone https://github.com/henrytamm/tea-time" into your terminal and press enter
* Make a .env file in the root folder '/tea-time/.env' and copy paste the following code or copy the .env.example file:
    ```json
        SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230
        DATABASE_URL=sqlite:///dev.db
        SCHEMA=flask_schema
        S3_BUCKET=<your bucket name>
        S3_KEY=<Access key Id>
        S3_SECRET=<Secret access key>
    ```
* Navigate to frontend folder called '/tea-time/react-app' through your terminal and type "npm install" then press enter
* Navigate to root folder called '/yell' through your terminal and type "python --version" then press enter to check your current version of python
* Run the following command replacing 3.9.4 with your version number of python: pipenv install --python "$PYENV_ROOT/versions/3.9.4/bin/python"
* Then run this command: pipenv install -r requirements.txt
* Navigate to root folder through your terminal and type "pipenv shell" then press enter, then run:
  "flask db upgrade",
  "flask seed all",
  "flask run" 
  and your backend should now be started
* Open a separate terminal and navigate to your frontend folder then type "npm start" to start your frontend
