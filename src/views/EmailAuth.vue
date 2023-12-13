<script>

import Cookies from 'js-cookie';
export default {
  mounted() {
    const jwt = this.$route.query.token
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000)
    Cookies.set('token', jwt, { expires: expires })
    window.location.href = '/';
  }
}

</script>
