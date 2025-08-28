<template>
  <v-container class="pa-0" fluid>
    <!-- Header Section -->
    <v-card class="mb-8" flat>
      <v-card-text class="pa-8">
        <h1 class="text-h3 font-weight-bold text-primary mb-2">Wie funktioniert Kontexto?</h1>
        <p class="text-h6 text-medium-emphasis">
          Das deutsche Wortspiel mit KI-basierter Ähnlichkeitsbewertung
        </p>
      </v-card-text>
    </v-card>

    <v-container class="max-w-6xl mx-auto">
      <!-- Game Description -->
      <v-card class="mb-8" variant="outlined" rounded="lg">
        <v-card-text class="pa-8">
          <p class="text-h6 mb-4">
            <strong>Kontexto</strong> ist ein kostenloses deutsches Wortspiel, das täglich neue
            Rätsel bietet. Das Ziel ist einfach: Rate das versteckte Zielwort durch clevere Hinweise
            und Wortähnlichkeit!
          </p>

          <p class="text-body-1 text-medium-emphasis">
            Anders als bei traditionellen Wortspielen zeigt dir Kontexto bei jedem Versuch, wie
            ähnlich dein eingegebenes Wort dem gesuchten Begriff ist. Diese
            <em>KI-basierte Ähnlichkeitsbewertung</em>
            hilft dir dabei, dich dem Zielwort Schritt für Schritt zu nähern.
          </p>
        </v-card-text>
      </v-card>

      <!-- Game Features Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">Warum Kontexto spielen?</h2>

        <v-row>
          <v-col cols="12" md="6" lg="3">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6 text-center">
                <v-icon icon="mdi-target" color="success" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Täglich neue Herausforderung</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Jeden Tag wartet ein neues Wortspiel auf dich. Perfekt für deine tägliche
                  Denkpause!
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6 text-center">
                <v-icon icon="mdi-translate" color="info" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Komplett auf Deutsch</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Entwickelt speziell für deutsche Wörter und Begriffe. Verbessere spielerisch
                  deinen Wortschatz!
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6 text-center">
                <v-icon icon="mdi-brain" color="warning" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">KI-gestützte Ähnlichkeit</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Modernste Technologie bewertet die Ähnlichkeit zwischen Wörtern basierend auf
                  Bedeutung und Kontext.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="3">
            <v-card class="h-100" variant="outlined" rounded="lg">
              <v-card-text class="pa-6 text-center">
                <v-icon icon="mdi-devices" color="secondary" size="48" class="mb-3" />
                <h3 class="text-h6 font-weight-bold mb-3">Überall spielbar</h3>
                <p class="text-body-2 text-medium-emphasis">
                  Funktioniert perfekt auf Handy, Tablet und Computer. Keine App-Installation nötig!
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- How to Play Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">
          Spielanleitung - So einfach geht's
        </h2>

        <v-card variant="outlined" rounded="lg">
          <v-card-text class="pa-8">
            <v-row>
              <v-col cols="12" md="6" lg="3">
                <div class="text-center mb-6">
                  <v-avatar size="64" color="primary" class="mb-4">
                    <span class="text-h4 text-white font-weight-bold">1</span>
                  </v-avatar>
                  <h3 class="text-h6 font-weight-bold mb-3">Wort eingeben</h3>
                  <p class="text-body-2 text-medium-emphasis">
                    Tippe ein beliebiges deutsches Wort in das Eingabefeld.
                  </p>
                </div>
              </v-col>

              <v-col cols="12" md="6" lg="3">
                <div class="text-center mb-6">
                  <v-avatar size="64" color="primary" class="mb-4">
                    <span class="text-h4 text-white font-weight-bold">2</span>
                  </v-avatar>
                  <h3 class="text-h6 font-weight-bold mb-3">Ähnlichkeit prüfen</h3>
                  <p class="text-body-2 text-medium-emphasis">
                    Du erhältst eine Bewertung, wie ähnlich dein Wort dem Zielwort ist.
                  </p>
                </div>
              </v-col>

              <v-col cols="12" md="6" lg="3">
                <div class="text-center mb-6">
                  <v-avatar size="64" color="primary" class="mb-4">
                    <span class="text-h4 text-white font-weight-bold">3</span>
                  </v-avatar>
                  <h3 class="text-h6 font-weight-bold mb-3">Strategisch denken</h3>
                  <p class="text-body-2 text-medium-emphasis">
                    Nutze die Ähnlichkeitswerte, um dich dem Zielwort zu nähern.
                  </p>
                </div>
              </v-col>

              <v-col cols="12" md="6" lg="3">
                <div class="text-center mb-6">
                  <v-avatar size="64" color="primary" class="mb-4">
                    <span class="text-h4 text-white font-weight-bold">4</span>
                  </v-avatar>
                  <h3 class="text-h6 font-weight-bold mb-3">Zielwort finden</h3>
                  <p class="text-body-2 text-medium-emphasis">
                    Wiederhole den Vorgang, bis du das gesuchte Wort errätst!
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </section>

      <!-- Comparison Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">Ähnlich wie Wordle, aber anders!</h2>

        <v-card variant="flat" color="primary" class="text-white">
          <v-card-text class="pa-8">
            <v-icon icon="mdi-lightbulb" size="48" class="mb-4" />
            <h3 class="text-h5 font-weight-bold mb-4">Von Buchstaben zu Bedeutungen</h3>
            <p class="text-h6 mb-4">
              Wenn dir <strong>Wordle</strong> gefällt, wirst du <strong>Kontexto</strong> lieben!
              Während Wordle auf Buchstabenpositionen basiert, verwendet Kontexto die semantische
              Ähnlichkeit zwischen Wörtern.
            </p>
            <p class="text-body-1 text-white text-medium-emphasis">
              Das bedeutet: Statt zu raten, welcher Buchstabe an welcher Position steht, denkst du
              über die <em>Bedeutung</em> und den <em>Kontext</em> der Wörter nach. Ein völlig neues
              Spielerlebnis!
            </p>
          </v-card-text>
        </v-card>
      </section>

      <!-- FAQ Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">Häufige Fragen (FAQ)</h2>

        <v-expansion-panels variant="accordion" class="mb-0">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-currency-eur-off" class="mr-3" color="success" />
                <span class="text-h6 font-weight-medium">Ist Kontexto kostenlos?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              Ja! Kontexto ist komplett kostenlos spielbar. Keine versteckten Kosten, keine
              Abonnements.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-calendar" class="mr-3" color="primary" />
                <span class="text-h6 font-weight-medium">Wie oft gibt es neue Rätsel?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              Jeden Tag um Mitternacht erscheint ein neues Kontexto-Rätsel. Du kannst aber auch
              vorherige Tage nachspielen!
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-cellphone" class="mr-3" color="info" />
                <span class="text-h6 font-weight-medium">Funktioniert es auf dem Handy?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              Absolut! Kontexto ist als Progressive Web App entwickelt und funktioniert perfekt auf
              allen Geräten - Smartphone, Tablet oder Desktop.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon icon="mdi-book-alphabet" class="mr-3" color="secondary" />
                <span class="text-h6 font-weight-medium"
                  >Welche deutschen Wörter sind erlaubt?</span
                >
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-1">
              Kontexto akzeptiert die meisten deutschen Substantive, Verben und Adjektive.
              Eigennamen und sehr seltene Begriffe sind meist nicht enthalten.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </section>

      <!-- Keywords for SEO (hidden) -->
      <div class="sr-only">
        <p>
          deutsches wortspiel online kostenlos, wordle deutsch alternative, tägliche wort rätsel,
          kontexto spielen, wortähnlichkeit spiel, deutsche word games, browser spiel kostenlos,
          wort erraten spiel, semantische ähnlichkeit, ki wortspiel, täglich neue rätsel deutsch
        </p>
      </div>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
// No script logic needed for this SEO content component
</script>
