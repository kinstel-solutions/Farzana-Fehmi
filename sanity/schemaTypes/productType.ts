import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceOnRequest',
      title: 'Price on Request',
      type: 'boolean',
      description: 'Turn on for custom, bridal, or bespoke made-to-order pieces',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Price (AUD)',
      type: 'number',
      description: 'Enter the price in AUD (e.g. 230). The site automatically formats this as "$230 AUD".',
      hidden: ({ parent }) => Boolean(parent?.priceOnRequest),
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as any;
          if (!parent?.priceOnRequest && (value === undefined || value === null || value <= 0)) {
            return 'Price is required when "Price on Request" is off.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Everyday Wear', value: 'Everyday Wear' },
          { title: 'Festive', value: 'Festive' },
          { title: 'Party', value: 'Party' },
        ],
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main / Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'material',
      title: 'Fabric / Material',
      type: 'string',
      description: 'e.g. Silk, Georgette, Chanderi Silk',
    }),
    defineField({
      name: 'occasion',
      title: 'Occasion',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Festive', value: 'Festive' },
          { title: 'Party', value: 'Party' },
          { title: 'Casual', value: 'Casual' },
          { title: 'Wedding', value: 'Wedding' },
          { title: 'Formal', value: 'Formal' },
        ],
      },
    }),
    defineField({
      name: 'fit',
      title: 'Fit / Style',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'Small' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Large', value: 'Large' },
          { title: 'Regular', value: 'Regular' },
          { title: 'Made-to-order', value: 'Made-to-order' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color (Optional)',
      type: 'string',
      description: 'Hex or Tailwind color hint if needed',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      priceOnRequest: 'priceOnRequest',
      media: 'mainImage',
    },
    prepare({ title, price, priceOnRequest, media }: any) {
      return {
        title,
        subtitle: priceOnRequest ? 'Price on Request' : price ? `$${price} AUD` : 'No price set',
        media,
      };
    },
  },
});
