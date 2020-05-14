<script>
import { getMethod, postMethod } from "@/api/api"
export default {
  methods: {
    testApi() {
      console.log("testApi")
      getMethod({ params: { a: "a" } }).then((res) => {
        console.log(res)
      })
    },
    testPsotApi() {
      postMethod({ data: { b: "b" } }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
