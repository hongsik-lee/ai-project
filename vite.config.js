import { defineConfig } from "vite"
import { resolve } from "path"

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const githubPagesBase = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : "/"

export default defineConfig({
  base: githubPagesBase,

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        main: resolve(__dirname, "src/pages/main/main.html"),
        login: resolve(__dirname, "src/pages/login/login.html"),
        postList: resolve(__dirname, "src/pages/post-list/list.html"),
        postDetail: resolve(__dirname, "src/pages/post-detail/detail.html"),
        write: resolve(__dirname, "src/pages/write/write.html"),
        mypage: resolve(__dirname, "src/pages/mypage/mypage.html"),
        profile: resolve(__dirname, "src/pages/profile/profile.html"),
      }
    }
  }

})