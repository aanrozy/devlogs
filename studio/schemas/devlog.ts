export default {
  name: 'devlog',
  title: 'Dev Log',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Log Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Feature', value: 'feature' },
          { title: 'Bug Fix', value: 'bugfix' },
          { title: 'Update', value: 'update' },
        ],
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
