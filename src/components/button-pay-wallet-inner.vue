<template>
  <transition name="f-fade-enter">
    <f-button
      v-show="show"
      :class="classButton"
      :variant="variant"
      block
      @click="click"
    >
      <span v-if="isGooglePay">
        <iframe :src="src" @load="onLoad" />
      </span>
      <div class="f-wallet-pay-button-click" />
    </f-button>
  </transition>
</template>

<script>
import FButton from '@/components/button/button'
import { loadCheckout } from '@/import'
import { api } from '@/utils/api'
import { mapState, mapStateGetSet } from '@/utils/store'
import { idMixin, props as idProps } from '@/mixins/id'
import { timeoutMixin } from '@/mixins/timeout'
import { errorHandler, key } from '@/utils/helpers'
import { btn, pay, wallet, variant, color } from '@/config/const'
import { setAttr, setStyle } from '@/utils/dom'
import { arrayIncludes } from '@/utils/array'
import { captureMessage } from '@/sentry'

const supportLongSvg = [
  'ar',
  'bg',
  'ca',
  'zh',
  'hr',
  'cs',
  'da',
  'nl',
  'en',
  'et',
  'fi',
  'fr',
  'de',
  'el',
  'id',
  'it',
  'ja',
  'ko',
  'ms',
  'no',
  'pl',
  'pt',
  'ru',
  'sr',
  'sk',
  'sl',
  'es',
  'sv',
  'th',
  'tr',
  'uk',
]

export default {
  components: {
    FButton,
  },
  mixins: [idMixin, timeoutMixin],
  inject: ['formRequest', 'validate'],
  props: {
    ...idProps,
  },
  data() {
    return {
      init: false,
      load: false,
    }
  },
  computed: {
    ...mapState('css_class', {
      variant: key(btn, pay, wallet, variant),
      color: key(btn, pay, wallet, color),
    }),
    ...mapState('params', ['amount', 'merchant_id']),
    ...mapState('options', ['api_domain', 'endpoint', 'disable_request']),
    ...mapStateGetSet(['can_make_payment', 'need_validate_card']),
    ...mapState(['has_fields', 'params']),
    ...mapStateGetSet('options', ['wallets_icons']),
    classButton() {
      return [
        'f-wallet-pay-button',
        `f-wallet-pay-button-${this.can_make_payment}-${this.variant}`,
        {
          [`f-wallet-pay-button-${this.can_make_payment}-load`]: this.load,
        },
      ]
    },
    show() {
      return this.init
    },
    isGooglePay() {
      return (
        this.can_make_payment === 'google' &&
        arrayIncludes(supportLongSvg, this.$i18n.locale)
      )
    },
    src() {
      return `https://pay.google.com/gp/p/generate_gpay_btn_img?buttonColor=${this.color}&browserLocale=${this.$i18n.locale}&buttonSizeMode=fill`
    },
  },
  watch: {
    amount: 'update',
    params: {
      handler: 'changeParams',
      deep: true,
    },
    '$i18n.locale': 'watchLocale',
    merchant_id: 'watchMerchantId',
  },
  mounted() {
    this.$nextTick().then(this.loadCheckout)
  },
  methods: {
    loadCheckout() {
      if (this.disable_request) return

      const div = document.createElement('div')
      setAttr(div, 'id', this.safeId())
      setStyle(div, 'display', 'none')
      this.$root.$el.appendChild(div)

      loadCheckout().then(this.initButton)
    },
    initButton($checkout) {
      if (this.disable_request) return

      this.button = $checkout
        .get('PaymentButton', {
          api,
          element: '#' + this.safeId(),
          origin: 'https://' + this.api_domain,
          endpoint: this.endpoint,
          data: this.store.formParams(),
        })
        .process(this.process)
        .on('show', () => {
          this.$root.$emit('show-pay')
          this.can_make_payment = this.button.method
          this.wallets_icons = [this.button.method]
          this.init = true
        })
        .on('hide', () => {
          this.init = false
        })
        .on('error', error => captureMessage('PaymentButton', 'error', error))
    },
    update(newValue, oldValue) {
      if (!this.button?.connector) return
      if (!newValue && !oldValue) return

      this.timeout(() => {
        this.button.update({ data: this.store.formParams() })
      }, 100)
    },
    process(model) {
      this.formRequest(model.data).catch(errorHandler)
    },
    changeParams() {
      if (!this.show) return

      this.button.utils.extend(this.button.params, {
        data: this.store.formParams(),
      })
    },
    click() {
      if (this.has_fields) {
        this.need_validate_card = false
        this.$nextTick()
          .then(() => this.validate())
          .then(() => this.button.click())
          .catch(errorHandler)
      } else {
        this.button.click()
      }
    },
    onLoad() {
      this.load = true
    },
    watchLocale(newValue, old) {
      if (
        arrayIncludes(supportLongSvg, newValue) &&
        arrayIncludes(supportLongSvg, old)
      )
        return

      this.load = false
    },
    watchMerchantId(value) {
      if (!this.show) return

      this.button.payment.setMerchant(value)
    },
  },
}
</script>
