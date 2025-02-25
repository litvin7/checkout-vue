<template>
  <div :class="classGroup" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div
      v-if="description"
      class="f-form-control-description"
      v-text="$t(description)"
    />
    <div :class="classGroupInner">
      <label v-if="prepend" :for="safeId()" class="f-form-control-prepend">
        <f-svg :name="prepend" fw />
      </label>
      <f-form-item
        ref="item"
        v-bind="attrs"
        v-on="$listeners"
        @focus="focus"
        @blur="blur"
        @input="input"
      >
        <slot :id="safeId()" />
      </f-form-item>
      <slot
        :id="safeId()"
        name="label"
        :classLabel="classLabel"
        :label="$t(label)"
      >
        <label
          v-if="label"
          :class="classLabel"
          :for="safeId()"
          v-text="$t(label)"
        />
      </slot>
      <f-placeholder v-if="showPlaceholder" v-bind="attrs" />
    </div>
    <f-tooltip-error
      v-if="showErrorTooltip"
      :show.sync="showErrorTooltipFlag"
      :target="() => $refs.item && $refs.item.$el"
    >
      <f-svg name="warning" size="md" />
      {{ error }}
    </f-tooltip-error>
    <transition name="f-slide-fade">
      <div v-if="showError" class="f-error">{{ error }}</div>
    </transition>
  </div>
</template>

<script>
import FSvg from '@/components/svg'
import FFormItem from '@/components/form/item'
import FPlaceholder from '@/components/base/placeholder'
import FTooltipError from '@/components/tooltip/tooltip-error'
import { mapState } from '@/utils/store'
import { isExist } from '@/utils/inspect'
import { idMixin, props as idProps } from '@/mixins/id'
import { isMountedMixin } from '@/mixins/is-mounted'
import { PROP_TYPE_STRING, PROP_TYPE_BOOLEAN } from '@/constants/props'
import { makeProp } from '@/utils/props'
import { timeoutMixin } from '@/mixins/timeout'

export default {
  components: {
    FSvg,
    FFormItem,
    FPlaceholder,
    FTooltipError,
  },
  mixins: [idMixin, isMountedMixin, timeoutMixin],
  inheritAttrs: false,
  props: {
    ...idProps,
    description: makeProp(PROP_TYPE_STRING),
    name: makeProp(PROP_TYPE_STRING, undefined, true),
    label: makeProp(PROP_TYPE_STRING, function () {
      return this.$attrs.component === 'checkbox' ? '' : this.name
    }),
    noLabelFloating: makeProp(PROP_TYPE_BOOLEAN, false),
    tooltip: makeProp(PROP_TYPE_BOOLEAN, false),
    hideError: makeProp(PROP_TYPE_BOOLEAN, false),
    prepend: makeProp(PROP_TYPE_STRING),
  },
  data() {
    return {
      focused: false,
      hover: false,
      value: null,
      showErrorTooltipFlag: false,
    }
  },
  computed: {
    ...mapState(['isSubmit']),
    validation() {
      if (!this.isMounted) return
      return this.$refs.item.$children[0].$refs.validation
    },
    touched() {
      if (!this.isMounted) return
      return this.validation.flags.touched
    },
    error() {
      if (!this.isMounted) return
      return this.validation.errors[0]
    },
    attrs() {
      return {
        ...this.$attrs,
        id: this.safeId(),
        name: `f-${this.name}`,
      }
    },
    classGroup() {
      return [
        'f-form-group',
        {
          'f-has-error': this.hasError,
        },
      ]
    },
    classGroupInner() {
      return [
        'f-form-group-inner',
        {
          'f-readonly': this.$attrs.readonly,
          'f-disabled': this.$attrs.disabled,
          ['f-form-group-inner-' + this.$attrs.component]:
            this.$attrs.component,
        },
      ]
    },
    classLabel() {
      return [
        'f-control-label',
        {
          'f-control-label-p': !this.noLabelFloating,
          'f-control-label-active':
            (isExist(this.value) && this.value !== '') || this.focused,
          'f-control-label-hover': this.hover,
          'f-control-label-focused': this.focused,
        },
      ]
    },
    hasError() {
      return this.error && (this.touched || this.isSubmit)
    },
    showError() {
      let showError = !this.tooltip && this.hasError && this.focused
      this.$emit('show-error', showError, this.error)
      return showError && !this.hideError
    },
    showErrorTooltip() {
      return this.tooltip && this.hasError && this.focused
    },
    showPlaceholder() {
      return this.noLabelFloating && this.safeId()
    },
  },
  watch: {
    showErrorTooltip: 'watchShowErrorTooltip',
  },
  methods: {
    focus() {
      this.focused = true
    },
    blur() {
      this.focused = false
    },
    input(value) {
      this.value = value
    },
    mouseenter() {
      this.hover = true
    },
    mouseleave() {
      this.hover = false
    },
    watchShowErrorTooltip(value) {
      this.timeout(() => {
        this.showErrorTooltipFlag = value
      })
    },
  },
}
</script>
