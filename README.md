# StringsOnline API
API'et er bygget i NodeJS, Express og Sequelize med MySQL database som datakilde.

## Overordnet filstruktur
I mapperne *Controllers* og *Models* finder du en *System* mappe samt en række filer som indeholder controllere og modeller til den specifikke løsning. Det vil sige produkter, produktgrupper, kurv, ordre og anmeldelser.

System mappen indeholder de mere elementære elementer som brugere, brugergrupper og organisationer.

Alle routes ligger fordelt på filerne *main*, *system* og *install* i mappen *Routes*.

## Postman
Der ligger en Postman dokumentation på nedenstående link som giver et overblik over de forskellige endpoints i API'et og hvordan de skal kaldes:
https://documenter.getpostman.com/view/6540576/2sA2xe3ZE6

Du skal selv oprette en database og indtaste dine bruger oplysninger til din denne i filen `.env`. Når du har gjort det kan du installere alle data ved at gå ind i mappen *System => Install* i Postman og kalde endpointet *Install models*. 

> OBS! Ovenstående kommando vil geninstallere alle tabeller og data og dermed slette de eksisterende. 

## Modeller & Data
Modeller og data er relateret. Det betyder at en model i mappen Models indlæser data fra en csv fil i mappen Data når der køres en *Install datamodels*. 

Derfor skal du huske at tilpasse datafilerne hvis du laver ændringer til datastrukturen i en af model filerne.  

## .env
Husk at oprette en .env fil i roden af dit repository og kopiere følgende ind i filen. Husk at tilrette dine egne database credentials. 

NB: Default bruger password er også genreret med secret string fra nedenstående kode.
```
# Port Number
PORT = 3000

# Database Credentials
DBHOST = [localhost]
DBNAME = [database_name]
DBUSER = [database_user]
DBPASSWD = [database_password]

# Token keys ############

# Token Access Key
TOKEN_ACCESS_KEY = myprivatekey # SECRET STRING 
TOKEN_ACCESS_EXPIRATION_SECS = 3600 # NUMBER OF EXPIRATION SECONDS: 1 HOUR

# Token Refresh Key
TOKEN_REFRESH_KEY = myprivaterefreshkey # SECRET STRING 
TOKEN_REFRESH_EXPIRATION_SECS = 86400 # NUMBER OF EXPIRATION SECONDS: 1 DAY
```
## Billeder
I mappen `Assets/Images` finder du alle billeder til sitet. 

Disse kan kopieres til din frontend løsning.

I nogle endpoints får du kun filnavnet ud og du skal derfor selv indsætte stien i dataudtrækket. 

## Users, Usergroups & Organisations
API'et har en brugertabel med relationer til brugergrupper og organisationer. Som udgangspunkt kan du bare bruge brugertabellen til login men 

- **Organisations (*orgs*):** bruges til at oprette virksomheder, foreninger eller lignende. En bruger kan kun være medlem af en organisation.

- **Brugergrupper (*groups*):** bruges til at oprette forskellige grupper med. Disse kan bruges til til at at lave forskellige grupperinger af brugere. Eksempelvis kan man have en gruppe for admin brugere, webshopkunder eller modtagere af et nyhedsbrev. En bruger kan være medlem af mange grupper.

## Start API'et
Kør `nodemon` i terminalen for at starte projektet. Databasen skal selvfølgelig være sat op før at API'et vil virke.