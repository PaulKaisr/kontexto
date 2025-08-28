<template>
  <v-container class="pa-0" fluid>
    <!-- Header Section -->
    <v-card class="mb-8" flat>
      <v-card-text class="pa-8">
        <v-btn
          :to="{ name: 'home' }"
          color="primary"
          variant="text"
          size="small"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Zurück zum Spiel
        </v-btn>

        <h1 class="text-h3 font-weight-bold text-primary mb-2">Über Kontexto</h1>
        <p class="text-h6 text-medium-emphasis">
          Das innovative deutsche Wortspiel mit KI-basierter Ähnlichkeit
        </p>
      </v-card-text>
    </v-card>

    <v-container class="max-w-6xl mx-auto">
      <!-- What is Kontexto Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">Was ist Kontexto?</h2>

        <v-card variant="outlined" rounded="lg">
          <v-card-text class="pa-8">
            <p class="text-h6 mb-4">
              <strong>Kontexto</strong> ist ein innovatives deutsches Wortspiel, das die Kraft der
              künstlichen Intelligenz nutzt, um ein völlig neues Spielerlebnis zu schaffen. Anders als
              traditionelle Wortspiele basiert Kontexto auf <em>semantischer Ähnlichkeit</em>
              – das bedeutet, es bewertet nicht nur Buchstaben oder Wortlängen, sondern die
              tatsächliche <strong>Bedeutung</strong> und den <strong>Kontext</strong> der Wörter.
            </p>

            <p class="text-body-1 text-medium-emphasis mb-4">
              Jeden Tag um Mitternacht erscheint ein neues Rätsel mit einem versteckten Zielwort.
              Deine Aufgabe: Rate das Wort durch clevere Hinweise und nutze dabei die KI-gestützte
              Ähnlichkeitsbewertung, um dich Schritt für Schritt der Lösung zu nähern.
            </p>

            <p class="text-body-1 text-medium-emphasis">
              Das Besondere an Kontexto: Es ist <strong>komplett kostenlos</strong>, funktioniert in jedem Webbrowser und wurde speziell
              für die deutsche Sprache entwickelt.
            </p>
          </v-card-text>
        </v-card>
      </section>

      <!-- AI Technology Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          <v-icon icon="mdi-brain" class="mr-3" color="primary" />
          Wie funktioniert die KI-Technologie?
        </h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6">
                <v-icon icon="mdi-chart-scatter-plot" color="info" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Semantische Vektorräume</h3>
                <p class="text-body-2 text-medium-emphasis mb-4">
                  Kontexto verwendet moderne Machine Learning-Modelle, die Wörter als Punkte in einem
                  hochdimensionalen Raum darstellen. Wörter mit ähnlicher Bedeutung liegen dabei näher
                  beieinander.
                </p>
                <v-alert type="info" variant="tonal" class="text-body-2">
                  <strong>Beispiel:</strong> "Hund" und "Katze" haben eine hohe Ähnlichkeit, weil beide Haustiere sind.
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6">
                <v-icon icon="mdi-layers" color="success" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Kontextuelle Bedeutung</h3>
                <p class="text-body-2 text-medium-emphasis mb-4">
                  Die KI versteht nicht nur einzelne Wörter, sondern auch deren Verwendung in
                  verschiedenen Kontexten. Dadurch entstehen überraschende und intuitive
                  Ähnlichkeitsverbindungen.
                </p>
                <v-alert type="success" variant="tonal" class="text-body-2">
                  <strong>Beispiel:</strong> "Schule" ist ähnlich zu "Kindheit", "Freunde" oder "Pausenhof".
                </v-alert>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Why Different Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          <v-icon icon="mdi-star" class="mr-3" color="primary" />
          Warum Kontexto anders ist
        </h2>

        <v-row>
          <v-col cols="12" md="4">
            <v-card class="h-100 text-center" variant="outlined" rounded="lg">
              <v-card-text class="pa-6">
                <v-icon icon="mdi-lightbulb" color="warning" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Innovatives Spielprinzip</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Bedeutungsbasierte Ähnlichkeit statt Buchstabenpositionen revolutioniert das Wortspielgenre.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="h-100 text-center" variant="outlined" rounded="lg">
              <v-card-text class="pa-6">
                <v-icon icon="mdi-school" color="success" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Pädagogisch wertvoll</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Erweitert Wortschatz und schärft das Verständnis für Wortbeziehungen und Synonyme.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="h-100 text-center" variant="outlined" rounded="lg">
              <v-card-text class="pa-6">
                <v-icon icon="mdi-earth" color="info" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Für alle zugänglich</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Keine App-Installation, keine Registrierung, komplett kostenlos auf jedem Gerät.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Mission Section -->
      <section class="mb-12">
        <v-card variant="flat" color="primary" class="text-white">
          <v-card-text class="pa-8">
            <div class="text-center mb-6">
              <v-icon icon="mdi-rocket" size="48" class="mb-4" />
              <h2 class="text-h4 font-weight-bold mb-4">Unsere Mission</h2>
            </div>
            
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="text-h6 font-weight-bold mb-3">Sprache spielerisch erleben</h3>
                <p class="text-body-1 text-white text-medium-emphasis">
                  Wir möchten zeigen, wie schön und vielfältig die deutsche Sprache ist. Durch
                  KI-gestützte Technologie machen wir Wortbeziehungen sichtbar und schaffen ein
                  intuitives Spielerlebnis.
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="text-h6 font-weight-bold mb-3">Kostenlose Bildung für alle</h3>
                <p class="text-body-1 text-white text-medium-emphasis">
                  Bildung sollte für jeden zugänglich sein. Deshalb ist Kontexto kostenlos verfügbar.
                  Die Finanzierung erfolgt durch nutzerfreundliche Werbung, die das Spielerlebnis nicht
                  beeinträchtigt.
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </section>

      <!-- Future Features Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          <v-icon icon="mdi-rocket-launch" class="mr-3" color="primary" />
          Geplante Features
        </h2>

        <v-row>
          <v-col cols="12" md="4">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6 text-center">
                <v-icon icon="mdi-chart-line" color="success" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Statistiken & Erfolge</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Detaillierte Spielstatistiken, Erfolgs-Badges und Fortschrittsverfolgung.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6 text-center">
                <v-icon icon="mdi-tag-multiple" color="info" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Thematische Modi</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Spezielle Rätselmodi zu bestimmten Themen wie Sport, Musik oder Geschichte.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6 text-center">
                <v-icon icon="mdi-account-group" color="secondary" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Mehrspieler-Modus</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Rate zusammen mit Freunden oder tritt in wöchentlichen Turnieren gegen andere an.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Developer Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          <v-icon icon="mdi-account-heart" class="mr-3" color="primary" />
          Über den Entwickler
        </h2>

        <v-card variant="outlined" rounded="lg">
          <v-card-text class="pa-8 text-center">
            <v-icon icon="mdi-code-tags" color="primary" size="48" class="mb-4" />
            <h3 class="text-h5 font-weight-bold mb-4">OneDevDiaries</h3>
            <p class="text-body-1 text-medium-emphasis mb-6">
              Folge der Entwicklungsreise von Kontexto und erhalte Einblicke in moderne Web-Entwicklung, 
              KI-Integration und Solo-Development-Prozesse.
            </p>
            
            <div class="d-flex justify-center flex-wrap ga-4">
              <v-btn
                href="https://www.youtube.com/@OneDevDiaries"
                target="_blank"
                color="error"
                variant="flat"
                size="large"
                rounded="lg"
                prepend-icon="mdi-youtube"
              >
                YouTube
              </v-btn>
              <v-btn
                href="https://www.tiktok.com/@onedevdiaries"
                target="_blank"
                color="black"
                variant="flat"
                size="large"
                rounded="lg"
                prepend-icon="mdi-music"
              >
                TikTok
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </section>

      <!-- Call to Action Section -->
      <section class="mb-12">
        <v-card variant="flat" color="secondary" class="text-white">
          <v-card-text class="pa-8 text-center">
            <v-icon icon="mdi-gamepad-variant" size="48" class="mb-4" />
            <h2 class="text-h4 font-weight-bold mb-4">Bereit für das Abenteuer?</h2>
            <p class="text-h6 mb-6">
              Entdecke die faszinierende Welt der deutschen Wortspiele mit KI-Power!
            </p>
            <div class="d-flex justify-center flex-wrap ga-4">
              <v-btn
                :to="{ name: 'home' }"
                color="white"
                variant="flat"
                size="large"
                rounded="lg"
              >
                Jetzt spielen
              </v-btn>
              <v-btn
                to="/spieltipps"
                color="white"
                variant="outlined"
                size="large"
                rounded="lg"
              >
                Spieltipps lesen
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </section>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
// About page component
</script>
