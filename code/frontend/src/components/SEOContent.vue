<template>
  <section class="seo-content mt-8 mb-4 max-w-4xl mx-auto px-4">
    <!-- Game Description for SEO -->
    <v-card
      variant="outlined"
      class="mb-6"
    >
      <v-card-title class="text-center py-3 sm:py-4 bg-primary text-white">
        <div class="d-flex align-center justify-center">
          <v-icon
            icon="mdi-help-circle"
            class="mr-2"
            :size="$vuetify.display.smAndUp ? 'large' : 'default'"
          />
          <span class="text-h6 sm:text-h4 font-bold">Wie funktioniert Kontexto?</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-4 sm:pa-6">
        <div class="space-y-4">
          <p class="text-body-1">
            <strong>Kontexto</strong> ist ein kostenloses deutsches Wortspiel,
            das täglich neue Rätsel bietet. Das Ziel ist einfach: Rate das
            versteckte Zielwort durch clevere Hinweise und Wortähnlichkeit!
          </p>

          <p class="text-body-1">
            Anders als bei traditionellen Wortspielen zeigt dir Kontexto bei
            jedem Versuch, wie ähnlich dein eingegebenes Wort dem gesuchten
            Begriff ist. Diese <em>KI-basierte Ähnlichkeitsbewertung</em>
            hilft dir dabei, dich dem Zielwort Schritt für Schritt zu nähern.
          </p>
        </div>
      </v-card-text>
    </v-card>

    <!-- Game Features -->
    <v-card
      variant="outlined"
      class="mb-6"
    >
      <v-card-title class="text-center py-3 sm:py-4 bg-primary text-white">
        <div class="d-flex align-center justify-center">
          <v-icon
            icon="mdi-star"
            class="mr-2"
            :size="$vuetify.display.smAndUp ? 'large' : 'default'"
          />
          <span class="text-h6 sm:text-h4 font-bold">Warum Kontexto spielen?</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-4 sm:pa-6">
        <div class="grid md:grid-cols-2 gap-4">
          <v-card
            variant="outlined"
            class="pa-3"
          >
            <div class="d-flex align-center mb-2">
              <v-icon
                icon="mdi-target"
                color="blue-darken-2"
                class="mr-2"
                size="small"
              />
              <h4 class="text-subtitle-1 font-bold text-blue-darken-2">
                Täglich neue Herausforderung
              </h4>
            </div>
            <p class="text-body-2 mb-0">
              Jeden Tag wartet ein neues Wortspiel auf dich. Perfekt für deine
              tägliche Denkpause!
            </p>
          </v-card>

          <v-card
            variant="outlined"
            class="pa-3"
          >
            <div class="d-flex align-center mb-2">
              <v-icon
                icon="mdi-translate"
                color="green-darken-2"
                class="mr-2"
                size="small"
              />
              <h4 class="text-subtitle-1 font-bold text-green-darken-2">
                Komplett auf Deutsch
              </h4>
            </div>
            <p class="text-body-2 mb-0">
              Entwickelt speziell für deutsche Wörter und Begriffe. Verbessere
              spielerisch deinen Wortschatz!
            </p>
          </v-card>

          <v-card
            variant="outlined"
            class="pa-3"
          >
            <div class="d-flex align-center mb-2">
              <v-icon
                icon="mdi-brain"
                color="purple-darken-2"
                class="mr-2"
                size="small"
              />
              <h4 class="text-subtitle-1 font-bold text-purple-darken-2">
                KI-gestützte Ähnlichkeit
              </h4>
            </div>
            <p class="text-body-2 mb-0">
              Modernste Technologie bewertet die Ähnlichkeit zwischen Wörtern
              basierend auf Bedeutung und Kontext.
            </p>
          </v-card>

          <v-card
            variant="outlined"
            class="pa-3"
          >
            <div class="d-flex align-center mb-2">
              <v-icon
                icon="mdi-devices"
                color="orange-darken-2"
                class="mr-2"
                size="small"
              />
              <h4 class="text-subtitle-1 font-bold text-orange-darken-2">
                Überall spielbar
              </h4>
            </div>
            <p class="text-body-2 mb-0">
              Funktioniert perfekt auf Handy, Tablet und Computer. Keine
              App-Installation nötig!
            </p>
          </v-card>
        </div>
      </v-card-text>
    </v-card>

    <!-- How to Play -->
    <v-card
      variant="outlined"
      class="mb-6"
    >
      <v-card-title class="text-center py-3 sm:py-4 bg-primary text-white">
        <div class="d-flex align-center justify-center">
          <v-icon
            icon="mdi-play-circle"
            class="mr-2"
            :size="$vuetify.display.smAndUp ? 'large' : 'default'"
          />
          <span class="text-h6 sm:text-h4 font-bold">Spielanleitung - So einfach geht's</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-4 sm:pa-6">
        <v-list class="pa-0">
          <v-list-item class="px-0 py-3">
            <template #prepend>
              <v-avatar
                size="32"
                color="primary"
                class="mr-3"
              >
                <span class="text-white font-bold">1</span>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-1 font-bold mb-1">
              Wort eingeben
            </v-list-item-title>
            <v-list-item-subtitle class="text-body-2">
              Tippe ein beliebiges deutsches Wort in das Eingabefeld.
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item class="px-0 py-3">
            <template #prepend>
              <v-avatar
                size="32"
                color="primary"
                class="mr-3"
              >
                <span class="text-white font-bold">2</span>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-1 font-bold mb-1">
              Ähnlichkeit prüfen
            </v-list-item-title>
            <v-list-item-subtitle class="text-body-2">
              Du erhältst eine Bewertung, wie ähnlich dein Wort dem Zielwort
              ist.
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item class="px-0 py-3">
            <template #prepend>
              <v-avatar
                size="32"
                color="primary"
                class="mr-3"
              >
                <span class="text-white font-bold">3</span>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-1 font-bold mb-1">
              Strategisch denken
            </v-list-item-title>
            <v-list-item-subtitle class="text-body-2">
              Nutze die Ähnlichkeitswerte, um dich dem Zielwort zu nähern.
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item class="px-0 py-3">
            <template #prepend>
              <v-avatar
                size="32"
                color="primary"
                class="mr-3"
              >
                <span class="text-white font-bold">4</span>
              </v-avatar>
            </template>
            <v-list-item-title class="text-body-1 font-bold mb-1">
              Zielwort finden
            </v-list-item-title>
            <v-list-item-subtitle class="text-body-2">
              Wiederhole den Vorgang, bis du das gesuchte Wort errätst!
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Comparison to similar games -->
    <v-card
      variant="outlined"
      class="mb-6"
    >
      <v-card-title class="text-center py-3 sm:py-4 bg-primary text-white">
        <div class="d-flex align-center justify-center">
          <v-icon
            icon="mdi-compare"
            class="mr-2"
            :size="$vuetify.display.smAndUp ? 'large' : 'default'"
          />
          <span class="text-h6 sm:text-h4 font-bold">Ähnlich wie Wordle, aber anders!</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-4 sm:pa-6">
        <v-alert
          type="info"
          variant="tonal"
          class="text-body-2"
        >
          <template #prepend>
            <v-icon
              icon="mdi-information"
              size="small"
            />
          </template>
          <div class="space-y-3">
            <p class="mb-3">
              Wenn dir <strong>Wordle</strong> gefällt, wirst du
              <strong>Kontexto</strong> lieben! Während Wordle auf
              Buchstabenpositionen basiert, verwendet Kontexto die semantische
              Ähnlichkeit zwischen Wörtern.
            </p>
            <p class="mb-0">
              Das bedeutet: Statt zu raten, welcher Buchstabe an welcher
              Position steht, denkst du über die
              <em>Bedeutung</em> und den <em>Kontext</em> der Wörter nach. Ein
              völlig neues Spielerlebnis!
            </p>
          </div>
        </v-alert>
      </v-card-text>
    </v-card>

    <!-- FAQ Section -->
    <v-card
      variant="outlined"
      class="mb-6"
    >
      <v-card-title class="text-center py-3 sm:py-4 bg-primary text-white">
        <div class="d-flex align-center justify-center">
          <v-icon
            icon="mdi-frequently-asked-questions"
            class="mr-2"
            :size="$vuetify.display.smAndUp ? 'large' : 'default'"
          />
          <span class="text-h6 sm:text-h4 font-bold">Häufige Fragen (FAQ)</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-4 sm:pa-6">
        <v-expansion-panels
          variant="accordion"
          class="mb-0"
        >
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon
                  icon="mdi-currency-eur-off"
                  class="mr-3"
                  size="small"
                  color="success"
                />
                <span class="font-bold">Ist Kontexto kostenlos?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-2">
              Ja! Kontexto ist komplett kostenlos spielbar. Keine versteckten
              Kosten, keine Abonnements.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon
                  icon="mdi-calendar"
                  class="mr-3"
                  size="small"
                  color="primary"
                />
                <span class="font-bold">Wie oft gibt es neue Rätsel?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-2">
              Jeden Tag um Mitternacht erscheint ein neues Kontexto-Rätsel. Du
              kannst aber auch vorherige Tage nachspielen!
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon
                  icon="mdi-cellphone"
                  class="mr-3"
                  size="small"
                  color="blue"
                />
                <span class="font-bold">Funktioniert es auf dem Handy?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-2">
              Absolut! Kontexto ist als Progressive Web App entwickelt und
              funktioniert perfekt auf allen Geräten - Smartphone, Tablet oder
              Desktop.
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon
                  icon="mdi-book-alphabet"
                  class="mr-3"
                  size="small"
                  color="purple"
                />
                <span class="font-bold">Welche deutschen Wörter sind erlaubt?</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="text-body-2">
              Kontexto akzeptiert die meisten deutschen Substantive, Verben und
              Adjektive. Eigennamen und sehr seltene Begriffe sind meist nicht
              enthalten.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <!-- Keywords for SEO (hidden) -->
    <div class="sr-only">
      <p>
        deutsches wortspiel online kostenlos, wordle deutsch alternative,
        tägliche wort rätsel, kontexto spielen, wortähnlichkeit spiel, deutsche
        word games, browser spiel kostenlos, wort erraten spiel, semantische
        ähnlichkeit, ki wortspiel, täglich neue rätsel deutsch
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script logic needed for this SEO content component
</script>


