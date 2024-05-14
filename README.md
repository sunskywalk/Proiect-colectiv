Deci baieti, o sa scriu fiecare ecran care il avem pe scurt si o sa explic ce as vrea sa schimbam, ce as vrea sa implementam in plus etc.
1) Toata povestea noastra(pe momentul de fata se porneste de pe ecranul Homescreen. pe ecranul dat se afla butonul start washing apasand pe care noi ajungem la ecranul Washscreen
sincer mie nu imi place cum arata, el arata ca un link. Eu as dori totusi sa il schimb pe ceva pai frumos, doar ca inca nu am ajuns cu ainile la el. In coltul din warful drept noi
avem butonul settings, apasand pe el ajungem la ecranul de setari. Mie in general nu imi place cum am implementat ecranul Homescreen, fiind ca daca nu ma insel, noi ne am inteles ca
facem conturi si logare, asta insemnand ca noi trebuie sa adaugam screenuri in fata lui. Oricum pe moment asta este doar un concept cum ar trebui sa arate aplicatia.

2)Ecranul setarilor. pe el avem 2 chestii in care putem sa facem alegere intre dark mode ore light mode, intre limbile aplicatiei. Pe moment am implementat schimbul de tema cu pastrarea
modificarii dupa inchiderea aplicatiei si pe tot seansul de expluatare. Modificarea limbilor inca nu este implementata, inca nu am idee cum o sa o facem, cred ca o lasam pentru final. Tot acolo
este link About us, i care o sa facem redirectionare la un PDF in care o sa facem scurta descriere cine suntem si cu ce putem fii mancati. In general imi place cum este realizat ecranul setarilor,
doar as vrea sa implementam schimbul de limba si sa adaugam pe el podificarea si stergerea contului.

3) Ecranul Washscreen reprezinta ecranul principal din care accesam tot ce ne trebuie, adica modelul de masina de spalat(ca sa primim instructiuni la ce regim punem hainele), butonul de adaugare a
hainelor in baza noastra de date despre haine(nu stiu cum sa explic mai bine) din care alegem hainele care vrem sa le spalam. Tot asa avem si istoricul spalarilor care cred ca ar trebui sa le mutam in
setari. Pe ecranul Washscreen eu as vrea sa mai adaugam butonul start washing, pe care apasand ne mutam la etapa de alegere a hainelor si primirea instructiunilor necesare.

4) Ecranul de adaugare a hainelor(Addclothes) contine in el alegerea parametrilor hainelor noastre, adica materalul si culoarea, denumirea. ne mai trebuie un buton care sa ne permita alegerea desenelor de pe
eticheta hainei. La momentul de 6 mai ora 00.58 este implementata stocarea hainelor introduse in aplicatie cu parametrii lor. Tot acolo putem accesa hainele care deja le-am introdus in spatiul de stocare
aplicatia ne permite sa stergem haina care nu ne intereseaza sau a fost introdusa incorect.

5) Mai exista si fisierul Themecontext in care este scrisa logica schimbarii temei. Acolo posibil sa fie niste greseli si erori, dar pe moment functioneaza corect, asa ca nu cred c este nevoie sa schimbam ceva

6) A aparut si fisierul LaundryLogic, cu ajutorul caruia functioneaza logica verificarii compatibilitatii hainelor pentru spalat.

La sfarsit eu vreau sa mentionez chestiile care trebuie implementate:

1)Schimbul de limba si pastrarea in memorie setarii

2)Logica pentru instructiunile de spalare upd 08.05(5.51am) am implementat logica verificarii compatibilitatei hainelor(gen nu putem spala albe cu colorate, tot asa este si compabilitatea dupa simbolurile de pe haina.)

3)Ecranul Washmashinescreen care sa ne permita alegerea modelului de masina de spalat care ne trebuie si pastrarea alegerii. upd 08.05(5.53am) Este implementat, a ramas introducerea interface-ului a fiecarui masini de spalat si implementarea algoritmului dupa care programul decide ce regim de spalat este necesar.

4)Ecranul Letswash in care selectam hainele si ni se afiseaza instructiunile. Tot acolo trebuie sa fie butnul pentru a descarca instructiunile in format PDF.

5)Tot ce tine de web - adica logarea, crearea contului, stergerea, etc. 

6)Intregul design al aplicatiei. Ceia ce este facut pe moment este doar un exemplu, noi trebuie sa facem asa incat aplicatia sa fie intr-un stil si sa arate calumea. upd 08.05(5.54am) scimbari mici in design.

7)Tot ce ne vine in minte pe parcursul dezvolatrii aplicatiei. 

8)Nu stiu cum, dar o sa incercam sa portam pe mai multe  platforme. Daca reusim - super, daca nu - trist, dar mno.

Upd 11.05(01.04am): Am facut modificari la designul setarilor si ecranului de pornire temporar. Am rezolvat problema la schimbarea temei(light/dark). Am inceput sa implementez logica generarii instructiunilor in Pdf. 

Upd 14.05(5.58am): Am reusit sa aduc logica de creare a instructiunilor pentru fiecare masina de spalat(la un nivel alfa, merge cat de cat, dar mai necesita sa lucram). Nu am facut generarea pdf-ului, pe moment am facut ca instructiunile sa apara intr-un push. Am facut schimbari in logica asemanarii parametrilor hainelor, am umplut "baza de date"(nimic special) si am mai facut modificari la Washscreen sa fie mai user-friendly.
