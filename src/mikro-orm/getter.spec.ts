function buildObject() {
  return {};
}

function wrapObject(obj: unknown) {
  Object.defineProperties(obj, {
    newProp: {
      get() {
        Object.defineProperty(this, 'newProp', {
          value: new WrappedEntity(),
          enumerable: false,
        });

        return this.newProp;
      },

      configurable: true,
    },
  });
}

class WrappedEntity {}

test.skip('returns the value from getter', () => {
  const anObject = buildObject();

  wrapObject(anObject);

  expect(anObject).toHaveProperty('newProp', expect.any(WrappedEntity));
});

test.skip('returns a different value from getter', () => {
  // Arrange
  const anObject = buildObject();
  wrapObject(anObject);
  const firstInstance = anObject['newProp'];

  // Act
  const secondInstance = anObject['newProp'];

  expect(firstInstance).not.toBe(secondInstance);
});
