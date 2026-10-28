# Tall Grass

De bestaande statische bandsite blijft op **https://www.tallgrass.band** staan.

- `/merch/`: vrijblijvende belangstelling voor EP op vinyl en shirt; aantallen, prijsvoorkeur inclusief NL-verzending, shirtmaat en opmerkingen.
- `/merch/#optredens`: afzonderlijke inschrijving voor concertmails.
- `/beheer.html`: ingang naar de beveiligde editor voor teksten, vragen, prijsopties en CSV-export.

## Bewerken

Open `/beheer.html` en log in met het ChatGPT-eigenaarsaccount. Wijzig het formulier, controleer het voorbeeld en kies **Opslaan en publiceren**. De instellingen worden direct door het formulier opgehaald. **Vorige versie laden** zet de vorige instellingen klaar; publiceer om terug te zetten.

De aanmeldingen zijn alleen voor het eigenaarsaccount zichtbaar. De twee lijsten blijven apart. Er worden geen betalingen geïnd en geen automatische mails verstuurd. De export voor concertmails bevat alleen actieve inschrijvers en hun persoonlijke afmeldlink; neem die link op in iedere mail.

## Code en hosting

`index.html`, `style.css` en `merch/` worden via de bestaande GitHub Pages-site gepubliceerd. Foto's, logo en overige inhoud blijven behouden. `service/` bevat de broncode van de formulier-API, database en editor. Die draait op de bestaande Sites-service; GitHub Pages kan zelf geen database of beveiligde server draaien. De oude losse formulier-URL verwijst door naar de bandsite.

De server controleert de door Sites geverifieerde identiteit tegen de runtimevariabele `ADMIN_EMAIL`. Stel deze alleen in via de beveiligde hostinginstellingen. Publiceer nooit `.dev.vars`, `.env`, lokale databases of credentials. Publieke configuratie bevat geen aanmeldingen. CORS staat uitsluitend de banddomeinen en de service zelf toe (plus de lokale preview tijdens ontwikkeling).

### Lokaal

Node 22.13+ vereist. Voer in `service/` uit:

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 migrations apply DB --local --config dist/server/wrangler.json --persist-to .wrangler/state
npm run dev -- --port 5178
```

Maak uitsluitend voor lokaal testen een genegeerd `service/.dev.vars` met `ADMIN_EMAIL=seedy@sites.test`. De Sites-ontwikkelserver biedt een lokaal testaccount. Serveer de repository daarnaast op `http://127.0.0.1:5180`, bijvoorbeeld met `python3 -m http.server 5180 --bind 127.0.0.1` vanuit de repositoryroot.

`merch/form-renderer.js` en `merch/form.css` worden ook voor het editorvoorbeeld gebruikt; houd deze gelijk aan `service/public/`. Wijzigingen aan de statische site lopen via GitHub Pages. Wijzigingen aan servercode vereisen ook een nieuwe Sites-publicatie vanuit `service/`; gebruik het bestaande project in `.openai/hosting.json` en het Sites-publicatieproces. Database-migraties staan in `service/drizzle/` en worden bij Sites-publicatie toegepast.

## Gecontroleerd

Productkeuzes en ingevulde waarden blijven behouden bij het wisselen van product. De editor slaat tekst, extra vragen en prijzen op en kan de vorige versie herstellen. Aanmeldingen, concertinschrijving, afmelden en opnieuw aanmelden zijn lokaal getest. Anonieme toegang tot beheer en exports wordt geweigerd; ongeldige invoer en ongeoorloofde origins worden afgewezen. TypeScript-controle en productiebuild slagen.
