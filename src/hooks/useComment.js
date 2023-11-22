const useComment = () => {
  const insertComment = (tree, commentId, item) => {
    if (tree.id === commentId) {
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });

      return tree;
    }

    let latestComment = [];

    latestComment = tree.items.map((obj) => {
      return insertComment(obj, commentId, item);
    });

    return { ...tree, items: latestComment };
  };

  const editComment = (tree, commentId, value) => {
    if (tree.id === commentId) {
      tree.name = value;
      return tree;
    }

    tree.items.map((obj) => {
      return editComment(obj, commentId, value);
    });

    return { ...tree };
  };

  const deleteComment = (tree, id) => {
    for (let i = 0; i < tree.items.length; i++) {
      const currentItem = tree.items[i];
      if (currentItem.id === id) {
        tree.items.splice(i, 1);
        return tree;
      } else {
        deleteComment(currentItem, id);
      }
    }
    return tree;
  };

  return { insertComment, editComment, deleteComment };
};

export default useComment;
