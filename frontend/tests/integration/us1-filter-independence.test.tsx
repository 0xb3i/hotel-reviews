import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Home from '@/app/page';

describe('Filter Independence', () => {
  it('should not change the global average score or hot tags when a filter is applied', async () => {
    render(<Home />);
    
    // Wait for the initial load of stats
    const initialScore = await waitFor(() => {
      const el = screen.getAllByText(/\d\.\d/)[0];
      expect(el).toBeInTheDocument();
      return el;
    });

    const scoreValue = initialScore.textContent;
    expect(scoreValue).toMatch(/\d\.\d/);
    
    // The "all tags" total counts should appear, e.g. "所有点评"
    const allTag = await waitFor(() => screen.getByText(/所有点评\(/));
    const allTagText = allTag.textContent;

    // Apply a search keyword
    const input = screen.getByPlaceholderText('搜索包含特定关键词的评论');
    await act(async () => { fireEvent.change(input, { target: { value: '卫生' } }); });
    await act(async () => { fireEvent.click(screen.getByText('搜索')); });

    // Wait for filtering to hypothetically happen (in reality, stats stay static)
    // We expect the score to remain exactly the same
    expect(screen.getAllByText(new RegExp(scoreValue as string))[0]).toBeInTheDocument();
    
    // We expect the 'all tags' count to remain exactly the same
    const postFilterAllTag = screen.getByText(/所有点评\(/);
    expect(postFilterAllTag.textContent).toBe(allTagText);

    // Apply a category single select choice
    // First, let's find a specific tag if it exists in stats
    const hotTag = screen.queryAllByRole('button').find(b => b.textContent?.match(/\(\d+\)/) && !b.textContent.includes('所有点评'));
    if (hotTag) {
        await act(async () => { fireEvent.click(hotTag); });
        expect(screen.getAllByText(new RegExp(scoreValue as string))[0]).toBeInTheDocument();
        expect(screen.getByText(/所有点评\(/).textContent).toBe(allTagText);
    }
  });

  it('verifies that duplicate keys are avoided in images', async () => {
    // This is tested implicitly by React printing no console.errors. 
    // We can spy on console.error.
    const consoleSpy = vi.spyOn(console, 'error');
    render(<Home />);
    
    await waitFor(() => {
      expect(screen.getAllByText(/\d\.\d/)[0]).toBeInTheDocument();
    });

    const duplicateKeyErrors = consoleSpy.mock.calls.filter(args => 
      typeof args[0] === 'string' && args[0].includes('two children with the same key')
    );
    
    expect(duplicateKeyErrors).toHaveLength(0);
    consoleSpy.mockRestore();
  });
});
