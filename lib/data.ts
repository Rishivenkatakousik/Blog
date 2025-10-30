export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: { label: string; color: "purple" | "pink" | "orange" | "green" }[];
}

export const allBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "ux-review-presentations",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    content: `How do you create compelling presentations that wow your colleagues and impress your managers?

Creating presentations that captivate your audience requires a combination of strategic thinking, visual design, and storytelling. In this comprehensive guide, we'll explore the key principles and techniques that will help you craft presentations that leave a lasting impression.

## Understanding Your Audience

Before you start designing your presentation, take time to understand who you're presenting to. Consider their background, expertise level, and what they hope to gain from your presentation. This will help you tailor your content and delivery to resonate with them.

## Visual Design Principles

Great presentations combine compelling visuals with clear messaging. Use a consistent color scheme, readable fonts, and high-quality images. Avoid cluttering slides with too much text—let your visuals tell the story while you provide the narrative.

## Storytelling Techniques

The most memorable presentations tell a story. Start with a hook that captures attention, build tension through your key points, and conclude with a clear call to action. Use real-world examples and case studies to make your content relatable.

## Practice and Delivery

No matter how great your slides are, your delivery matters. Practice your presentation multiple times, time yourself, and be prepared to handle questions. Speak with confidence, make eye contact with your audience, and use gestures to emphasize key points.`,
    author: "Olivia Rhye",
    date: "20 Jan 2025",
    image: "/abstract-purple-blue-gradient-design.jpg",
    tags: [
      { label: "Design", color: "purple" },
      { label: "Research", color: "pink" },
      { label: "Presentation", color: "pink" },
    ],
  },
  {
    id: "2",
    slug: "migrating-to-linear-101",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug...",
    content: `Linear helps streamline software projects, sprints, tasks, and bug tracking. In this guide, we'll walk you through the migration process and best practices.

## Why Migrate to Linear?

Linear offers a modern approach to issue tracking with a focus on speed and simplicity. Unlike traditional tools, Linear is built for teams that value efficiency and collaboration.

## Getting Started

The first step is to set up your Linear workspace and invite your team members. Linear provides integrations with popular tools like GitHub, Slack, and more.

## Importing Your Data

Linear makes it easy to import your existing issues from other platforms. You can migrate from Jira, GitHub Issues, or other tools with just a few clicks.

## Best Practices

- Organize your projects clearly
- Use consistent naming conventions
- Set up automation rules
- Integrate with your development workflow

## Conclusion

Migrating to Linear can significantly improve your team's productivity and collaboration. Start with a pilot project and gradually expand as your team gets comfortable with the platform.`,
    author: "Phoenix Baker",
    date: "19 Jan 2025",
    image: "/two-people-working-at-desk-with-laptops.jpg",
    tags: [
      { label: "Design", color: "purple" },
      { label: "Research", color: "pink" },
    ],
  },
  {
    id: "3",
    slug: "building-your-api-stack",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for cr...",
    content: `The rise of RESTful APIs has been met by a rise in tools for creating, managing, and scaling them. Building a robust API stack is crucial for modern application development.

## Understanding API Architecture

A well-designed API architecture is the foundation of scalable applications. Consider factors like authentication, rate limiting, versioning, and documentation.

## Choosing Your Tools

There are many tools available for building APIs. Popular choices include Express.js, FastAPI, Django REST Framework, and more. Choose based on your team's expertise and project requirements.

## API Design Best Practices

- Use RESTful principles
- Implement proper error handling
- Version your APIs
- Provide comprehensive documentation
- Use authentication and authorization

## Monitoring and Maintenance

Once your API is live, monitoring is essential. Track performance metrics, error rates, and usage patterns. Set up alerts for critical issues.

## Scaling Considerations

As your API grows, consider caching strategies, database optimization, and load balancing. Plan for scale from the beginning.`,
    author: "Lana Steiner",
    date: "18 Jan 2025",
    image: "/phone-device-mockups-stacked.jpg",
    tags: [
      { label: "Software", color: "green" },
      { label: "Research", color: "pink" },
    ],
  },
  {
    id: "4",
    slug: "bill-walsh-leadership-lessons",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a Super Bowl winning Dynasty?",
    content: `Like to know the secrets of transforming a 2-14 team into a Super Bowl winning Dynasty?

Bill Walsh, the legendary coach of the San Francisco 49ers, revolutionized football with his innovative approach to leadership and team management. His principles extend far beyond sports and apply to any organization.

## The West Coast Offense

Walsh's most famous contribution was the West Coast Offense, a revolutionary passing system that changed football forever. But more importantly, it demonstrated his philosophy of continuous innovation.

## Leadership Principles

1. **Attention to Detail**: Walsh believed that excellence comes from perfecting the fundamentals.
2. **Clear Communication**: He ensured every player understood their role and the team's objectives.
3. **Adaptability**: Walsh was willing to evolve his strategies based on circumstances.
4. **Building Culture**: He created a winning culture that attracted top talent.

## Team Building

Walsh understood that great teams are built on trust and mutual respect. He invested in his players' development and created an environment where they could thrive.

## Legacy

Walsh's principles have influenced countless leaders across industries. His emphasis on preparation, innovation, and team culture remains relevant today.`,
    author: "Alec Whitten",
    date: "17 Jan 2025",
    image: "/two-people-standing-in-landscape-mountains.jpg",
    tags: [
      { label: "Leadership", color: "purple" },
      { label: "Management", color: "purple" },
    ],
  },
  {
    id: "5",
    slug: "pm-mental-models",
    title: "PM mental models",
    description:
      "Mental models are simple expressions of complex processes or relationships.",
    content: `Mental models are simple expressions of complex processes or relationships. As a product manager, understanding and using mental models can significantly improve your decision-making.

## What Are Mental Models?

Mental models are frameworks that help us understand how things work. They simplify complex systems into understandable patterns.

## Common PM Mental Models

### Jobs to Be Done
Understand what job customers are trying to accomplish, not just what features they want.

### Network Effects
Recognize how the value of a product increases as more people use it.

### Opportunity Cost
Always consider what you're giving up by choosing one path over another.

### First Principles Thinking
Break down complex problems into fundamental truths and rebuild from there.

## Applying Mental Models

Use mental models to:
- Make better product decisions
- Communicate more effectively with stakeholders
- Identify market opportunities
- Anticipate competitive threats

## Continuous Learning

The best PMs continuously develop new mental models and refine existing ones. Read widely, learn from other disciplines, and stay curious.`,
    author: "Demi Wilkinson",
    date: "16 Jan 2025",
    image: "/person-with-curly-hair-portrait.jpg",
    tags: [
      { label: "Product", color: "purple" },
      { label: "Research", color: "pink" },
      { label: "Frameworks", color: "orange" },
    ],
  },
  {
    id: "6",
    slug: "what-is-wireframing",
    title: "What is wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    content: `Introduction to Wireframing and its Principles. Learn from the best in the industry.

Wireframing is a crucial step in the design process that bridges the gap between concept and final design. It helps teams align on structure and functionality before investing in visual design.

## What Is a Wireframe?

A wireframe is a low-fidelity representation of a digital product's layout and structure. It focuses on functionality and user flow rather than visual design.

## Why Wireframe?

- **Clarify Structure**: Wireframes help define the layout and hierarchy of information.
- **Facilitate Communication**: They provide a common language for designers, developers, and stakeholders.
- **Identify Issues Early**: Problems are easier and cheaper to fix at the wireframe stage.
- **Speed Up Development**: Clear wireframes reduce ambiguity during implementation.

## Wireframing Best Practices

1. **Start Simple**: Use basic shapes and text to represent elements.
2. **Focus on Functionality**: Don't worry about colors or detailed styling.
3. **Involve Stakeholders**: Get feedback early and often.
4. **Iterate Quickly**: Wireframes should be easy to modify.
5. **Document Interactions**: Show how users will interact with the interface.

## Tools for Wireframing

Popular wireframing tools include Figma, Balsamiq, Adobe XD, and Sketch. Choose based on your team's needs and preferences.

## From Wireframe to Design

Once wireframes are approved, they serve as the foundation for visual design. Designers can focus on aesthetics while maintaining the approved structure.`,
    author: "Candice Wu",
    date: "15 Jan 2025",
    image: "/design-wireframe-mockups-components.jpg",
    tags: [
      { label: "Design", color: "purple" },
      { label: "Research", color: "pink" },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return allBlogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(): BlogPost[] {
  return allBlogPosts.slice(0, 3);
}

export function getAllPosts(): BlogPost[] {
  return allBlogPosts.slice(3);
}
