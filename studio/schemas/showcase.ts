export default {
  name: 'showcase',
  title: 'Showcase',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Project URL',
      type: 'url',
      description: 'Link ke website project (contoh: https://project-demo.com)',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Personal Website', value: 'personal' },
          { title: 'Corporate Website', value: 'corporate' },
          { title: 'SaaS Solution', value: 'saas' },
          { title: 'Custom Web App', value: 'webapp' },
        ],
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
};
