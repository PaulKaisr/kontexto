<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const impressumUrl = computed(() => {
  return window.location.origin + router.resolve("/impressum").href;
});
</script>

<template>
  <v-container class="dialog">
    <v-card>
      <v-card-title class="headline">Datenschutzerklärung</v-card-title>
      <v-card-text>
        <p class="text-h5 my-2" id="m4158">Präambel</p>
        <p>
          Mit der folgenden Datenschutzerklärung möchten wir Sie darüber
          aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend
          auch kurz als "Daten“ bezeichnet) wir zu welchen Zwecken und in
          welchem Umfang im Rahmen der Bereitstellung unserer Applikation
          verarbeiten.
        </p>
        <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
        <p>Stand: 19. August 2025</p>
        <div class="text-h5 my-2">Inhaltsübersicht</div>
        <v-list class="index">
          <li>
            <a class="underline text-blue-300 index-link" href="#m4158"
              >Präambel</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m3"
              >Verantwortlicher</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#mOverview"
              >Übersicht der Verarbeitungen</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m13"
              >Maßgebliche Rechtsgrundlagen</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m27"
              >Sicherheitsmaßnahmen</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m25"
              >Übermittlung von personenbezogenen Daten</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m24"
              >Datenverarbeitung in Drittländern</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m12"
              >Löschung von Daten</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m134"
              >Einsatz von Cookies</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m225"
              >Bereitstellung des Onlineangebotes und Webhosting</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m263"
              >Webanalyse, Monitoring und Optimierung</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m264"
              >Werbung und Marketing</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m15"
              >Änderung und Aktualisierung der Datenschutzerklärung</a
            >
          </li>
          <li>
            <a class="underline text-blue-300 index-link" href="#m10"
              >Rechte der betroffenen Personen</a
            >
          </li>
        </v-list>
        <div class="text-h5 my-2" id="m3">Verantwortlicher</div>
        <p>Paul Kaiser<br />Leonhardtstraße 2<br />76131 Karlsruhe</p>
        E-Mail-Adresse:
        <p>
          <a
            class="underline text-blue-300"
            href="mailto:kontexto.app@gmail.com"
            >kontexto.app@gmail.com</a
          >
        </p>
        Impressum:
        <p>
          <router-link class="underline text-blue-300" to="/impressum">{{
            impressumUrl
          }}</router-link>
        </p>
        <div class="text-h5 my-2" id="mOverview">
          Übersicht der Verarbeitungen
        </div>
        <p>
          Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und
          die Zwecke ihrer Verarbeitung zusammen und verweist auf die
          betroffenen Personen.
        </p>
        <div class="text-h6">Arten der verarbeiteten Daten</div>
        <ul>
          <li>Nutzungsdaten.</li>
          <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
        </ul>
        <div class="text-h5 my-2">Kategorien betroffener Personen</div>
        <v-list>
          <li>Nutzer.</li>
        </v-list>
        <div class="text-h5 my-2">Zwecke der Verarbeitung</div>
        <v-list>
          <li>Sicherheitsmaßnahmen.</li>
          <li>Reichweitenmessung.</li>
          <li>Tracking.</li>
          <li>Profile mit nutzerbezogenen Informationen.</li>
          <li>
            Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.
          </li>
          <li>Informationstechnische Infrastruktur.</li>
        </v-list>
        <div class="text-h5 my-2" id="m13">Maßgebliche Rechtsgrundlagen</div>
        <p>
          Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der
          DSGVO, auf deren Basis wir personenbezogene Daten verarbeiten. Bitte
          nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale
          Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten
          können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen
          maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung
          mit.
        </p>
        <v-list>
          <li>
            <strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> -
            Die betroffene Person hat ihre Einwilligung in die Verarbeitung der
            sie betreffenden personenbezogenen Daten für einen spezifischen
            Zweck oder mehrere bestimmte Zwecke gegeben.
          </li>
          <li>
            <strong
              >Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong
            >
            - Die Verarbeitung ist zur Wahrung der berechtigten Interessen des
            Verantwortlichen oder eines Dritten erforderlich, sofern nicht die
            Interessen oder Grundrechte und Grundfreiheiten der betroffenen
            Person, die den Schutz personenbezogener Daten erfordern,
            überwiegen.
          </li>
        </v-list>
        <p>
          Zusätzlich zu den Datenschutzregelungen der DSGVO gelten nationale
          Regelungen zum Datenschutz in Deutschland. Hierzu gehört insbesondere
          das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der
          Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält
          insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf
          Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer
          Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke
          und zur Übermittlung sowie automatisierten Entscheidungsfindung im
          Einzelfall einschließlich Profiling. Des Weiteren regelt es die
          Datenverarbeitung für Zwecke des Beschäftigungsverhältnisses (§ 26
          BDSG), insbesondere im Hinblick auf die Begründung, Durchführung oder
          Beendigung von Beschäftigungsverhältnissen sowie die Einwilligung von
          Beschäftigten. Ferner können Landesdatenschutzgesetze der einzelnen
          Bundesländer zur Anwendung gelangen.
        </p>
        <div class="text-h5 my-2" id="m27">Sicherheitsmaßnahmen</div>
        <p>
          Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter
          Berücksichtigung des Stands der Technik, der Implementierungskosten
          und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung
          sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des
          Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen
          geeignete technische und organisatorische Maßnahmen, um ein dem Risiko
          angemessenes Schutzniveau zu gewährleisten.
        </p>
        <p>
          Zu den Maßnahmen gehören insbesondere die Sicherung der
          Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch
          Kontrolle des physischen und elektronischen Zugangs zu den Daten als
          auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der
          Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir
          Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten,
          die Löschung von Daten und Reaktionen auf die Gefährdung der Daten
          gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener
          Daten bereits bei der Entwicklung bzw. Auswahl von Hardware, Software
          sowie Verfahren entsprechend dem Prinzip des Datenschutzes, durch
          Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
        </p>
        <p>
          TLS-Verschlüsselung (https): Um Ihre via unserem Online-Angebot
          übermittelten Daten zu schützen, nutzen wir eine TLS-Verschlüsselung.
          Sie erkennen derart verschlüsselte Verbindungen an dem Präfix https://
          in der Adresszeile Ihres Browsers.
        </p>
        <div class="text-h5 my-2" id="m25">
          Übermittlung von personenbezogenen Daten
        </div>
        <p>
          Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es
          vor, dass die Daten an andere Stellen, Unternehmen, rechtlich
          selbstständige Organisationseinheiten oder Personen übermittelt oder
          sie ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten
          können z.B. mit IT-Aufgaben beauftragte Dienstleister oder Anbieter
          von Diensten und Inhalten, die in eine Webseite eingebunden werden,
          gehören. In solchen Fällen beachten wir die gesetzlichen Vorgaben und
          schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die
          dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.
        </p>
        <div class="text-h5 my-2" id="m24">
          Datenverarbeitung in Drittländern
        </div>
        <p>
          Sofern wir Daten in einem Drittland (d.h., außerhalb der Europäischen
          Union (EU), des Europäischen Wirtschaftsraums (EWR)) verarbeiten oder
          die Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter
          oder der Offenlegung bzw. Übermittlung von Daten an andere Personen,
          Stellen oder Unternehmen stattfindet, erfolgt dies nur im Einklang mit
          den gesetzlichen Vorgaben.
        </p>
        <p>
          Vorbehaltlich ausdrücklicher Einwilligung oder vertraglich oder
          gesetzlich erforderlicher Übermittlung verarbeiten oder lassen wir die
          Daten nur in Drittländern mit einem anerkannten Datenschutzniveau,
          vertraglichen Verpflichtung durch sogenannte Standardschutzklauseln
          der EU-Kommission, beim Vorliegen von Zertifizierungen oder
          verbindlicher internen Datenschutzvorschriften verarbeiten (Art. 44
          bis 49 DSGVO, Informationsseite der EU-Kommission:
          <a
            href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de"
            target="_blank"
            >https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de</a
          >).
        </p>
        <div class="text-h5 my-2" id="m12">Löschung von Daten</div>
        <p>
          Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen
          Vorgaben gelöscht, sobald deren zur Verarbeitung erlaubten
          Einwilligungen widerrufen werden oder sonstige Erlaubnisse entfallen
          (z.B. wenn der Zweck der Verarbeitung dieser Daten entfallen ist oder
          sie für den Zweck nicht erforderlich sind). Sofern die Daten nicht
          gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke
          erforderlich sind, wird deren Verarbeitung auf diese Zwecke
          beschränkt. D.h., die Daten werden gesperrt und nicht für andere
          Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder
          steuerrechtlichen Gründen aufbewahrt werden müssen oder deren
          Speicherung zur Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen
          oder juristischen Person erforderlich ist.
        </p>
        <p>
          Unsere Datenschutzhinweise können ferner weitere Angaben zu der
          Aufbewahrung und Löschung von Daten beinhalten, die für die jeweiligen
          Verarbeitungen vorrangig gelten.
        </p>
        <div class="text-h5 my-2" id="m134">Einsatz von Cookies</div>
        <p>
          Cookies sind kleine Textdateien, bzw. sonstige Speichervermerke, die
          Informationen auf Endgeräten speichern und Informationen aus den
          Endgeräten auslesen. Z.B. um den Login-Status in einem Nutzerkonto,
          einen Warenkorbinhalt in einem E-Shop, die aufgerufenen Inhalte oder
          verwendete Funktionen eines Onlineangebotes speichern. Cookies können
          ferner zu unterschiedlichen Zwecken eingesetzt werden, z.B. zu Zwecken
          der Funktionsfähigkeit, Sicherheit und Komfort von Onlineangeboten
          sowie der Erstellung von Analysen der Besucherströme.
        </p>
        <p>
          <strong>Hinweise zur Einwilligung: </strong>Wir setzen Cookies im
          Einklang mit den gesetzlichen Vorschriften ein. Daher holen wir von
          den Nutzern eine vorhergehende Einwilligung ein, außer wenn diese
          gesetzlich nicht gefordert ist. Eine Einwilligung ist insbesondere
          nicht notwendig, wenn das Speichern und das Auslesen der
          Informationen, also auch von Cookies, unbedingt erforderlich sind, um
          dem den Nutzern einen von ihnen ausdrücklich gewünschten
          Telemediendienst (also unser Onlineangebot) zur Verfügung zu stellen.
          Die widerrufliche Einwilligung wird gegenüber den Nutzern deutlich
          kommuniziert und enthält die Informationen zu der jeweiligen
          Cookie-Nutzung.
        </p>
        <p>
          <strong>Hinweise zu datenschutzrechtlichen Rechtsgrundlagen: </strong
          >Auf welcher datenschutzrechtlichen Rechtsgrundlage wir die
          personenbezogenen Daten der Nutzer mit Hilfe von Cookies verarbeiten,
          hängt davon ab, ob wir Nutzer um eine Einwilligung bitten. Falls die
          Nutzer einwilligen, ist die Rechtsgrundlage der Verarbeitung Ihrer
          Daten die erklärte Einwilligung. Andernfalls werden die mithilfe von
          Cookies verarbeiteten Daten auf Grundlage unserer berechtigten
          Interessen (z.B. an einem betriebswirtschaftlichen Betrieb unseres
          Onlineangebotes und Verbesserung seiner Nutzbarkeit) verarbeitet oder,
          wenn dies im Rahmen der Erfüllung unserer vertraglichen Pflichten
          erfolgt, wenn der Einsatz von Cookies erforderlich ist, um unsere
          vertraglichen Verpflichtungen zu erfüllen. Zu welchen Zwecken die
          Cookies von uns verarbeitet werden, darüber klären wir im Laufe dieser
          Datenschutzerklärung oder im Rahmen von unseren Einwilligungs- und
          Verarbeitungsprozessen auf.
        </p>
        <p>
          <strong>Speicherdauer:</strong>Im Hinblick auf die Speicherdauer
          werden die folgenden Arten von Cookies unterschieden:
        </p>
        <v-list>
          <li>
            <strong
              >Temporäre Cookies (auch: Session- oder Sitzungs-Cookies):</strong
            >Temporäre Cookies werden spätestens gelöscht, nachdem ein Nutzer
            ein Online-Angebot verlassen und sein Endgerät (z.B. Browser oder
            mobile Applikation) geschlossen hat.
          </li>
          <li>
            <strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch
            nach dem Schließen des Endgerätes gespeichert. So können
            beispielsweise der Login-Status gespeichert oder bevorzugte Inhalte
            direkt angezeigt werden, wenn der Nutzer eine Website erneut
            besucht. Ebenso können die mit Hilfe von Cookies erhobenen Daten der
            Nutzer zur Reichweitenmessung verwendet werden. Sofern wir Nutzern
            keine expliziten Angaben zur Art und Speicherdauer von Cookies
            mitteilen (z. B. im Rahmen der Einholung der Einwilligung), sollten
            Nutzer davon ausgehen, dass Cookies permanent sind und die
            Speicherdauer bis zu zwei Jahre betragen kann.
          </li>
        </v-list>
        <p>
          <strong
            >Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-Out): </strong
          >Nutzer können die von ihnen abgegebenen Einwilligungen jederzeit
          widerrufen und zudem einen Widerspruch gegen die Verarbeitung
          entsprechend den gesetzlichen Vorgaben im Art. 21 DSGVO einlegen.
          Nutzer können ihren Widerspruch auch über die Einstellungen ihres
          Browsers erklären, z.B. durch Deaktivierung der Verwendung von Cookies
          (wobei dadurch auch die Funktionalität unserer Online-Dienste
          eingeschränkt sein kann). Ein Widerspruch gegen die Verwendung von
          Cookies zu Online-Marketing-Zwecken kann auch über die Websites
          <a href="https://optout.aboutads.info" target="_blank"
            >https://optout.aboutads.info</a
          >
          und
          <a href="https://www.youronlinechoices.com/" target="_blank"
            >https://www.youronlinechoices.com/</a
          >
          erklärt werden.
        </p>
        <p>
          <strong
            >Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und
            Diensten:</strong
          >
        </p>
        <v-list class="m-elements">
          <li>
            <strong>Cookie-Einstellungen und Verwaltung: </strong>Wir verwenden
            ein Cookie-Consent-System, das Ihnen die volle Kontrolle über Ihre
            Cookie-Präferenzen gibt. Bei Ihrem ersten Besuch unserer Website
            erscheint ein Cookie-Banner, über den Sie Ihre Einstellungen
            verwalten können. Sie können jederzeit über die Cookie-Einstellungen
            am unteren rechten Bildschirmrand Ihre Präferenzen ändern.
            <br /><br />
            <strong>Cookie-Kategorien:</strong>
            <ul class="mt-2">
              <li>
                <strong>Notwendige Cookies:</strong> Diese sind für das
                Funktionieren der Website erforderlich und können nicht
                deaktiviert werden. Sie speichern Ihre Spielstände und
                Einstellungen.
              </li>
              <li>
                <strong>Analyse-Cookies:</strong> Diese helfen uns zu verstehen,
                wie Besucher unsere Website nutzen (Google Analytics). Sie
                können diese deaktivieren.
              </li>
              <li>
                <strong>Marketing-Cookies:</strong> Diese werden für
                personalisierte Werbung verwendet, einschließlich Google AdSense.
                Sie können diese jederzeit deaktivieren.
              </li>
            </ul>
            <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO
            (Einwilligung) für nicht-notwendige Cookies.
          </li>
          <li>
            <strong
              >Verarbeitung von Cookie-Daten auf Grundlage einer Einwilligung: </strong
            >Wir setzen ein Verfahren zum Cookie-Einwilligungs-Management ein,
            in dessen Rahmen die Einwilligungen der Nutzer in den Einsatz von
            Cookies, bzw. der im Rahmen des
            Cookie-Einwilligungs-Management-Verfahrens genannten Verarbeitungen
            und Anbieter eingeholt sowie von den Nutzern verwaltet und
            widerrufen werden können. Hierbei wird die Einwilligungserklärung
            gespeichert, um deren Abfrage nicht erneut wiederholen zu müssen und
            die Einwilligung entsprechend der gesetzlichen Verpflichtung
            nachweisen zu können. Die Speicherung kann serverseitig und/oder in
            einem Cookie (sogenanntes Opt-In-Cookie, bzw. mithilfe
            vergleichbarer Technologien) erfolgen, um die Einwilligung einem
            Nutzer, bzw. dessen Gerät zuordnen zu können. Vorbehaltlich
            individueller Angaben zu den Anbietern von
            Cookie-Management-Diensten, gelten die folgenden Hinweise: Die Dauer
            der Speicherung der Einwilligung kann bis zu zwei Jahren betragen.
            Hierbei wird ein pseudonymer Nutzer-Identifikator gebildet und mit
            dem Zeitpunkt der Einwilligung, Angaben zur Reichweite der
            Einwilligung (z. B. welche Kategorien von Cookies und/oder
            Diensteanbieter) sowie dem Browser, System und verwendeten Endgerät
            gespeichert.
          </li>
        </v-list>
        <div class="text-h5 my-2" id="m225">
          Bereitstellung des Onlineangebotes und Webhosting
        </div>
        <p>
          Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste
          zur Verfügung stellen zu können. Zu diesem Zweck verarbeiten wir die
          IP-Adresse des Nutzers, die notwendig ist, um die Inhalte und
          Funktionen unserer Online-Dienste an den Browser oder das Endgerät der
          Nutzer zu übermitteln.
        </p>
        <v-list class="m-elements">
          <li>
            <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z.B.
            besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten); Meta-,
            Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben,
            Identifikationsnummern, Einwilligungsstatus).
          </li>
          <li>
            <strong>Betroffene Personen:</strong> Nutzer (z.B.
            Webseitenbesucher, Nutzer von Onlinediensten).
          </li>
          <li>
            <strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres
            Onlineangebotes und Nutzerfreundlichkeit; Informationstechnische
            Infrastruktur (Betrieb und Bereitstellung von Informationssystemen
            und technischen Geräten (Computer, Server etc.).);
            Sicherheitsmaßnahmen.
          </li>
          <li>
            <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6
            Abs. 1 S. 1 lit. f) DSGVO).
          </li>
        </v-list>
        <p>
          <strong
            >Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und
            Diensten:</strong
          >
        </p>
        <v-list class="m-elements">
          <li>
            <strong>Erhebung von Zugriffsdaten und Logfiles: </strong>Der
            Zugriff auf unser Onlineangebot wird in Form von so genannten
            "Server-Logfiles" protokolliert. Zu den Serverlogfiles können die
            Adresse und Name der abgerufenen Webseiten und Dateien, Datum und
            Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über
            erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem
            des Nutzers, Referrer URL (die zuvor besuchte Seite) und im
            Regelfall IP-Adressen und der anfragende Provider gehören. Die
            Serverlogfiles können zum einen zu Zwecken der Sicherheit eingesetzt
            werden, z.B., um eine Überlastung der Server zu vermeiden
            (insbesondere im Fall von missbräuchlichen Angriffen, sogenannten
            DDoS-Attacken) und zum anderen, um die Auslastung der Server und
            ihre Stabilität sicherzustellen;
            <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6
            Abs. 1 S. 1 lit. f) DSGVO);
            <strong>Löschung von Daten:</strong> Logfile-Informationen werden
            für die Dauer von maximal 30 Tagen gespeichert und danach gelöscht
            oder anonymisiert. Daten, deren weitere Aufbewahrung zu
            Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des
            jeweiligen Vorfalls von der Löschung ausgenommen.
          </li>
          <li>
            <strong>STRATO: </strong>Leistungen auf dem Gebiet der
            Bereitstellung von informationstechnischer Infrastruktur und
            verbundenen Dienstleistungen (z.B. Speicherplatz und/oder
            Rechenkapazitäten); <strong>Dienstanbieter:</strong> STRATO AG,
            Pascalstraße 10,10587 Berlin, Deutschland;
            <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6
            Abs. 1 S. 1 lit. f) DSGVO);
            <strong>Website: </strong>
            <a href="https://www.strato.de" target="_blank"
              >https://www.strato.de</a
            >;
            <strong>Datenschutzerklärung: </strong>
            <a href="https://www.strato.de/datenschutz" target="_blank"
              >https://www.strato.de/datenschutz</a
            >; <strong>Auftragsverarbeitungsvertrag: </strong> Wird vom
            Dienstanbieter bereitgestellt.
          </li>
        </v-list>
        <div class="text-h5 my-2" id="m263">
          Webanalyse, Monitoring und Optimierung
        </div>
        <p>
          Die Webanalyse (auch als "Reichweitenmessung" bezeichnet) dient der
          Auswertung der Besucherströme unseres Onlineangebotes und kann
          Verhalten, Interessen oder demographische Informationen zu den
          Besuchern, wie z.B. das Alter oder das Geschlecht, als pseudonyme
          Werte umfassen. Mit Hilfe der Reichweitenanalyse können wir z.B.
          erkennen, zu welcher Zeit unser Onlineangebot oder dessen Funktionen
          oder Inhalte am häufigsten genutzt werden oder zur Wiederverwendung
          einladen. Ebenso können wir nachvollziehen, welche Bereiche der
          Optimierung bedürfen.
        </p>
        <p>
          Neben der Webanalyse können wir auch Testverfahren einsetzen, um z.B.
          unterschiedliche Versionen unseres Onlineangebotes oder seiner
          Bestandteile zu testen und optimieren.
        </p>
        <p>
          Sofern nachfolgend nicht anders angegeben, können zu diesen Zwecken
          Profile, d.h. zu einem Nutzungsvorgang zusammengefasste Daten angelegt
          und Informationen in einem Browser, bzw. in einem Endgerät gespeichert
          und aus diesem ausgelesen werden. Zu den erhobenen Angaben gehören
          insbesondere besuchte Webseiten und dort genutzte Elemente sowie
          technische Angaben, wie der verwendete Browser, das verwendete
          Computersystem sowie Angaben zu Nutzungszeiten. Sofern Nutzer in die
          Erhebung ihrer Standortdaten uns gegenüber oder gegenüber den
          Anbietern der von uns eingesetzten Dienste einverstanden erklärt
          haben, können auch Standortdaten verarbeitet werden.
        </p>
        <p>
          Es werden ebenfalls die IP-Adressen der Nutzer gespeichert. Jedoch
          nutzen wir ein IP-Masking-Verfahren (d.h., Pseudonymisierung durch
          Kürzung der IP-Adresse) zum Schutz der Nutzer. Generell werden die im
          Rahmen von Webanalyse, A/B-Testings und Optimierung keine Klardaten
          der Nutzer (wie z.B. E-Mail-Adressen oder Namen) gespeichert, sondern
          Pseudonyme. D.h., wir als auch die Anbieter der eingesetzten Software
          kennen nicht die tatsächliche Identität der Nutzer, sondern nur den
          für Zwecke der jeweiligen Verfahren in deren Profilen gespeicherten
          Angaben.
        </p>
        <v-list class="m-elements">
          <li>
            <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z.B.
            besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten); Meta-,
            Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben,
            Identifikationsnummern, Einwilligungsstatus).
          </li>
          <li>
            <strong>Betroffene Personen:</strong> Nutzer (z.B.
            Webseitenbesucher, Nutzer von Onlinediensten).
          </li>
          <li>
            <strong>Zwecke der Verarbeitung:</strong> Reichweitenmessung (z.B.
            Zugriffsstatistiken, Erkennung wiederkehrender Besucher); Profile
            mit nutzerbezogenen Informationen (Erstellen von Nutzerprofilen);
            Tracking (z.B. interessens-/verhaltensbezogenes Profiling, Nutzung
            von Cookies); Bereitstellung unseres Onlineangebotes und
            Nutzerfreundlichkeit.
          </li>
          <li>
            <strong>Sicherheitsmaßnahmen:</strong> IP-Masking (Pseudonymisierung
            der IP-Adresse).
          </li>
          <li>
            <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1
            lit. a) DSGVO).
          </li>
        </v-list>
        <p>
          <strong
            >Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und
            Diensten:</strong
          >
        </p>
        <v-list class="m-elements">
          <li>
            <strong>Google Analytics: </strong>Webanalyse, Reichweitenmessung
            sowie Messung von Nutzerströmen;
            <strong>Dienstanbieter:</strong> Google Ireland Limited, Gordon
            House, Barrow Street, Dublin 4, Irland;
            <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1
            lit. a) DSGVO); <strong>Website:</strong>
            <a
              href="https://marketingplatform.google.com/intl/de/about/analytics/"
              target="_blank"
              >https://marketingplatform.google.com/intl/de/about/analytics/</a
            >; <strong>Datenschutzerklärung:</strong>
            <a href="https://policies.google.com/privacy" target="_blank"
              >https://policies.google.com/privacy</a
            >; <strong>Auftragsverarbeitungsvertrag:</strong>
            <a
              href="https://business.safety.google/adsprocessorterms"
              target="_blank"
              >https://business.safety.google/adsprocessorterms</a
            >;
            <strong
              >Standardvertragsklauseln (Gewährleistung Datenschutzniveau bei
              Verarbeitung in Drittländern):</strong
            >
            <a
              href="https://business.safety.google/adsprocessorterms"
              target="_blank"
              >https://business.safety.google/adsprocessorterms</a
            >;
            <strong>Widerspruchsmöglichkeit (Opt-Out):</strong> Opt-Out-Plugin:
            <a
              href="https://tools.google.com/dlpage/gaoptout?hl=de"
              target="_blank"
              >https://tools.google.com/dlpage/gaoptout?hl=de</a
            >, Einstellungen für die Darstellung von Werbeeinblendungen:
            <a
              href="https://adssettings.google.com/authenticated"
              target="_blank"
              >https://adssettings.google.com/authenticated</a
            >; <strong>Weitere Informationen:</strong>
            <a
              href="https://privacy.google.com/businesses/adsservices"
              target="_blank"
              >https://privacy.google.com/businesses/adsservices</a
            >
            (Arten der Verarbeitung sowie der verarbeiteten Daten).
          </li>
        </v-list>
        <div class="text-h5 my-2" id="m264">
          Werbung und Marketing
        </div>
        <p>
          Wir verwenden Werbedienstleister, um die kostenlose Bereitstellung
          unseres Onlineangebotes zu finanzieren. Diese Dienste verwenden
          Cookies und andere Technologien, um personalisierte Werbung zu
          schalten und die Werbeleistung zu messen.
        </p>
        <v-list class="m-elements">
          <li>
            <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z.B.
            besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten); Meta-,
            Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben,
            Identifikationsnummern, Einwilligungsstatus).
          </li>
          <li>
            <strong>Betroffene Personen:</strong> Nutzer (z.B.
            Webseitenbesucher, Nutzer von Onlinediensten).
          </li>
          <li>
            <strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres
            Onlineangebotes und Nutzerfreundlichkeit; Marketing; Profile mit
            nutzerbezogenen Informationen; Tracking.
          </li>
          <li>
            <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1
            lit. a) DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
          </li>
        </v-list>
        <p>
          <strong
            >Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und
            Diensten:</strong
          >
        </p>
        <v-list class="m-elements">
          <li>
            <strong>Google AdSense: </strong>Wir nutzen Google AdSense zur
            Schaltung von Werbeanzeigen. Google AdSense verwendet Cookies, um
            anzeigenrelevante Informationen zu sammeln und personalisierte
            Werbung zu schalten. <strong>Dienstanbieter:</strong> Google Ireland
            Limited, Gordon House, Barrow Street, Dublin 4, Irland;
            <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1
            lit. a) DSGVO); <strong>Website:</strong>
            <a href="https://www.google.com/adsense" target="_blank"
              >https://www.google.com/adsense</a
            >; <strong>Datenschutzerklärung:</strong>
            <a href="https://policies.google.com/privacy" target="_blank"
              >https://policies.google.com/privacy</a
            >; <strong>Widerspruchsmöglichkeit (Opt-Out):</strong>
            <a
              href="https://adssettings.google.com/authenticated"
              target="_blank"
              >https://adssettings.google.com/authenticated</a
            >; <strong>Weitere Informationen:</strong>
            <a
              href="https://privacy.google.com/businesses/adsservices"
              target="_blank"
              >https://privacy.google.com/businesses/adsservices</a
            >.
          </li>
        </v-list>
        <div class="text-h5 my-2" id="m15">
          Änderung und Aktualisierung der Datenschutzerklärung
        </div>
        <p>
          Wir bitten Sie, sich regelmäßig über den Inhalt unserer
          Datenschutzerklärung zu informieren. Wir passen die
          Datenschutzerklärung an, sobald die Änderungen der von uns
          durchgeführten Datenverarbeitungen dies erforderlich machen. Wir
          informieren Sie, sobald durch die Änderungen eine Mitwirkungshandlung
          Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle
          Benachrichtigung erforderlich wird.
        </p>
        <p>
          Sofern wir in dieser Datenschutzerklärung Adressen und
          Kontaktinformationen von Unternehmen und Organisationen angeben,
          bitten wir zu beachten, dass die Adressen sich über die Zeit ändern
          können und bitten die Angaben vor Kontaktaufnahme zu prüfen.
        </p>
        <div class="text-h5 my-2" id="m10">Rechte der betroffenen Personen</div>
        <p>
          Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die
          sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
        </p>
        <v-list>
          <li>
            <strong
              >Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus
              Ihrer besonderen Situation ergeben, jederzeit gegen die
              Verarbeitung der Sie betreffenden personenbezogenen Daten, die
              aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
              Widerspruch einzulegen; dies gilt auch für ein auf diese
              Bestimmungen gestütztes Profiling. Werden die Sie betreffenden
              personenbezogenen Daten verarbeitet, um Direktwerbung zu
              betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die
              Verarbeitung der Sie betreffenden personenbezogenen Daten zum
              Zwecke derartiger Werbung einzulegen; dies gilt auch für das
              Profiling, soweit es mit solcher Direktwerbung in Verbindung
              steht.</strong
            >
          </li>
          <li>
            <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das
            Recht, erteilte Einwilligungen jederzeit zu widerrufen.
          </li>
          <li>
            <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine
            Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet
            werden und auf Auskunft über diese Daten sowie auf weitere
            Informationen und Kopie der Daten entsprechend den gesetzlichen
            Vorgaben.
          </li>
          <li>
            <strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den
            gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie
            betreffenden Daten oder die Berichtigung der Sie betreffenden
            unrichtigen Daten zu verlangen.
          </li>
          <li>
            <strong
              >Recht auf Löschung und Einschränkung der Verarbeitung:</strong
            >
            Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu
            verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden,
            bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine
            Einschränkung der Verarbeitung der Daten zu verlangen.
          </li>
          <li>
            <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das
            Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach
            Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen
            und maschinenlesbaren Format zu erhalten oder deren Übermittlung an
            einen anderen Verantwortlichen zu fordern.
          </li>
          <li>
            <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben
            unbeschadet eines anderweitigen verwaltungsrechtlichen oder
            gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
            Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres
            gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des
            mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die
            Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die
            Vorgaben der DSGVO verstößt.
          </li>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>
