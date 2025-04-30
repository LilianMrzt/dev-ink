import React, { FC, useMemo } from 'react'
import { FixedSizeList } from 'react-window'
import './editor-line-numbers.css'
import AutoSizer from 'react-virtualized-auto-sizer'
import { EditorLineNumbersProps } from '@interfaces/ui/blocs/editor/EditorLineNumbersProps'

const EditorLineNumbers: FC<EditorLineNumbersProps> = ({
    code,
    listRef
}) => {
    const lines = useMemo(() => {
        return code.split('\n')
    }, [code])

    return (
        <div
            className={'editor-line-numbers'}
        >
            <AutoSizer>
                {({ height }) => {
                    return (
                        <FixedSizeList
                            height={height}
                            width={60}
                            itemSize={20}
                            itemCount={lines.length + 1}
                            ref={listRef}
                            style={{
                                overflow: 'hidden'
                            }}
                        >
                            {({ index, style }) => {
                                if (index === lines.length) {
                                    return (
                                        <div
                                            style={{
                                                ...style,
                                                height: 200
                                            }}
                                        />
                                    )
                                }

                                return (
                                    <div
                                        className={'line-number'}
                                        style={style}
                                    >
                                        {index + 1}
                                    </div>
                                )
                            }}
                        </FixedSizeList>
                    )
                }}
            </AutoSizer>
        </div>
    )
}

export default EditorLineNumbers
