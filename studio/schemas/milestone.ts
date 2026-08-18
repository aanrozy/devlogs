export default {
  name: 'milestone',
  title: 'Milestone',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Milestone Title',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Planned', value: 'planned' },
        ],
      },
      initialValue: 'completed',
    },
  ],
};
