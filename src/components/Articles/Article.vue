<template>
  <b-card
    :title="article.title"
    :img-src="article.urlToImage"
    :img-alt="article.title"
    img-top
    tag="article"
    style="max-width: 17rem"
    class="mb-3"
  >
    <b-card-text class="meta">
      {{ article.author }} - {{ article.source.name }}
    </b-card-text>
    <b-card-text class="text"> {{ article.description }} </b-card-text>

    <b-button
      :href="article.url"
      target="_blank"
      variant="link"
      tag="a"
      class="read-more-link"
      >Read more</b-button
    >
  </b-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  display: inline-block;
  margin: 0 0 1em;
  width: 100%;
}
.card-title {
  font-size: 18px;
}
.card img {
  border-bottom: 1px solid #bdc3c7;
}
.text {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  color: #9b9b9b;
}
.meta {
  font-size: 12px;
  font-weight: 500;
}
.read-more-link {
  padding: 0;
  color: inherit;
  text-decoration: underline;
}
</style>