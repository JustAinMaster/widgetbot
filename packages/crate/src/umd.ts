import Crate from './api'

// Evaluate content inside <script> tag
if (document) {
  const { currentScript: script } = document

  // Allow webpack to inject global Crate variable
  setTimeout(() => {
    if (script && !script.getAttribute('no-eval')) {
      const asyncAwait = (() => {
        try {
          eval('eval("(async function() {})")')
        } catch (e) {
          return false
        }
        return true
      })()

      eval(
        asyncAwait
          ? `(async function() {${script.innerHTML}})()`
          : script.innerHTML
      )
    }
  }, 0)
}

export default Crate
