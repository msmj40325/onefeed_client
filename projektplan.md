# Indholdsfortegnelse

1. [Deltagere](#deltagere)
2. [Ideerne](#ideerne)
3. [projektstyringsmetode](#projektstyringsmetode)
4. [Risikovurdering](#risikovurdering)
5. [Team Kontrakt](#team-kontrakt)
6. [Tidsplan med Milestones](#tidsplan-med-milestones)
7. [Overholdelse af krav og mål](#overholdelse-af-krav-og-mål)

---

## Projektplan - Team 3

### Deltagere:

##### Abdul

-   Opstarteren
-   Kontaktskaberen
-   Idemageren

##### Andreas

-   Koordinatoren
-   Organisatoren
-   Idemageren

##### Michael

-   Specialisten
-   Analysatoren
-   Afslutteren

##### Rasmus

-   Specialisten
-   Analysatoren
-   Afslutteren

---

## Ideerne:

###### Plan A - SocialHub

**En platform der samler flere forskellige sociale medier ét sted**

-   Se posts i et samlet feed
-   Poste til flere platforme på én gang
-   Filtrere mellem forskellige platforme
-   Ét samlet login (ikke længere at skulle huske mange passwords, bedre sikkerhed)
-   Rettet mod normale brugere, ikke virksomheder

<br>

###### Plan B - Freelance tool

**Et værktøj til at til at tracke timer og opgaver for freelancers**

-   Indbygget timer
-   Kalender og andre organisationsværktøjer
-   pause og motivations redskaber
-   Kontaktpanel til kontakt med klienter
-   Regnskab

---

## Projektstyringsmetode:

Kanban via GitLab

---

## Risikovurdering:

| **Ting der kan gå galt**                       | **Forebyggelse**                                                         | **Løsninger**                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Sygdom i gruppen, der forhindrer produktivitet | Tage højde for at sygdom kan forekomme                                   | Andre i gruppen tager sig af opgaven eller nedskalering                    |
| Manglende kompetencer                          |                                                                          | Der sættest tid af til at får den nødvendige kompetence eller nedskalering |
| GitLab går ned                                 | Sørge for at man altid har den nyeste version lokalt                     | Gå over til GitHub med det vi har lokalt                                   |
| Gruppen er ude af stand til at følge tisplanen | Holde et opdaterings møde hver gang                                      | Der bruges mere tid en planlagt eller nedskalering                         |
| Konflikt i gruppen                             | Holde en god tone og have en gruppekontrakt med håndtering af uenigheder | Referer til gruppekontrakt eller kontakt vejleder                          |
| En fra gruppen dropper ud                      | Sørger for at alle er med i projektet                                    | Der bruges mere tid en planlagt eller nedskalering                         |
| Et element af projektet skal startes for fra   |                                                                          | Der bruges mere tid en planlagt eller nedskalering                         |
| Vi mister vores arbejde                        |                                                                          |                                                                            |

---

## Team Kontrakt:

##### Kontaktning

Vi kommunikerer hovedsageligt via en messenger gruppe, men bruger discord når vi mødes digitalt og organiserer os over gitlab.

##### Forventninger

Vi forventer at gruppens medlemmer arbejder seriøst med projektet, men at vi også har det sjovt imens og stadig er gode venner når vi er færdige ❤️. Vi forventer at vi møder til tiden og deltager aktivt i både undervisning og gruppe- og projektarbejde. Vi forventer at Abdul dropper ud. Vi forventer at skabe et projekt som vi er tilfredse med, og som opfylder kravene skrevet i studieordningen.

---

## Tidsplan med Milestones:

Vi har ca. 4 timer pr. torsdag eftermiddag + Ca. 40 timer i uge 9 til at arbejde på projektet.

Aflevering d. 25 Maj

##### Milestones

-   Mockup
-   Færdig Frontend
-   Database
-   Eget Api
-   FB Api
-   Twitter Api
-   Loginsystem
-   Færdig prototype

---

## Overholdelse af krav og mål

#### Teknologi krav:

<br>

**Styling skrives i SASS/SCSS med brug af partials.**

-   Vi vil bruge css preprocessor SCSS og strukturering skal være efter BEM metoden.

**Semantic HTML skal anvendes (se ARIA, accessible rich internet application)**

-   Det skal vi nok.

**Vue3.js og Vue CLI skal anvendes.**

-   Projektet oprettes via command line ved bruge af vue create project-name.

**Applikationen skal være en Single Page Application (SPA).**

-   Gør vi via Vue Router.

**Routing skal implementeres med vue router.**

-   Vil vil bruge routing til at navigere rundt mellem undersiderne.

**Applikationen skal kvalitetssikres i et offentligt tilgængeligt repository (public github/gitlab etc. projekt).**

-   Vil vi gøre brug af GitLab’s issuretrcker til at styre projektet.

**Applikationens kode skal versionsstyres ved brug af GIT.**

-   Ved at vi bruger gitlab bruger vi CLI for at kunne udføre nogle kommandor sådan vi har versionsstyring i projektet.

**Applikationen skal implementere software test.**

-   Vi vil gøre brug af de metoder til softwaretest vi får undervisning i.

**Applikationen må meget gerne implementeres som en PWA men det er valgfrit.**

-   Skal vi nok.

---

#### Funktionalitets krav:

<br>

**Applikationen skal hente og parse data i JSON format fra en API. API data er applikationens indhold. Det vil være en fordel at bruge et CMS som backend der leverer API data.**

-   Det kommer vi til da vi skal arbejde både med fb og twitters api

**Applikationen skal implementere dynamisk routing med en eller flere overbliks sider der dynamisk linker til undersider. Dette kaldes også Source-Detail Page.**

-   Vi vil gøre brug af routing til at navigere mellem undersider, samt tillade brugeren at gå ind på sin
    dynamiske profilside, og opdatere sine data.

**Filtrering skal implementeres som f.eks en søgefunktion på siden.**

-   Vi tillader brugeren at filtrere mellem forskellige SoMe platforme

**Applikationen skal have en eller flere input forms og der skal som minimum implementeres validering in front-end, men gerne suppleres med back-end validering.**

-   Vi tillader brugeren at oprette posts til forskellige SoMe

**Applikationen skal bygges responsivt, mobile first, men fungere cross platform på relevante platforme.**

-   Selvfølgelig. vi bygger den da mobile first, PWA

**Applikationen skal udgives så den er offentligt tilgængelig for brugere. Applikationen skal køre fra aflevering af rapport til 1 uge efter alle eksamensforsøg.**

-   Vi vil undersøge hvordan vi får de forskellige elementer af projektet, API, database og SPA’en, hosted live

---

### Læringsmål

#### Viden om:

<br>

**Client-side webapplikationsarkitektur**

-   javascript, vue, html, css

**Style processing og naming conventions**

-   SASS/SCSS - BEM

**Frontend eco system**

-   Vue

**Frontend workflows**

-   Vue, CLI

**Frontend frameworks**

-   Vue

**valitetssikring**

-   GIT, Software Test, Projektplanlægning

---

#### Færdigheder:

<br>

**Planlægge, udvikle og implementere/idriftsætte client-side web applikationer baseret på konkrete udviklingsønsker (skal hostes live/deploy, se krav til projekt)**

-   Skal vi nok

**Vælge egnede værktøjer og metoder til implementering af client-side web applikationer**

-   Vue, SASS/SCSS, HTML, CSS

**Implementere cross-platform web brugergrænseflader**

-   ::-moz, mobile first

**Implementere client-side logik**

-   Vue

**Anvende metoder til kvalitetssikring af client-side web applikationer**

-   Det vil vi når vi ved noget om det. Kodestandarder

---

#### Kompetencer:

<br>

**Analysere komplekse udviklingsønsker til at vælge og anvende egnede workflows, metoder, værktøjer og frameworks til implementering af cross-platform, performant, vedligeholdelsesvenlig og dynamiske client-side web applikationer**

-   Det er det der står ovenover, men kondenseret
