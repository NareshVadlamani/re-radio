import React, { useCallback, useState, useMemo } from 'react';
import { InputBase, IconButton } from '@material-ui/core';
import { InputBaseProps } from '@material-ui/core/InputBase';
import { MdSearch as SearchIcon, MdClose as CloseIcon } from 'react-icons/md';
import { useStyles } from './styles';

interface Props extends InputBaseProps {
  icon?: React.ReactNode;
  onIconClick?(): void;
}

export const ReSearch: React.FC<Props> = ({ icon, className, onBlur, onFocus, onIconClick, ...rest }) => {
  const classes = useStyles();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleInputFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      setIsInputFocused(true);
      if (onFocus) {
        onFocus(event);
      }
    },
    [onFocus],
  );
  const handleInputBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      setIsInputFocused(false);
      if (onBlur) {
        onBlur(event);
      }
    },
    [onBlur],
  );

  const classNames = useMemo(
    () =>
      [classes.root, isInputFocused ? classes.rootFocused : '', rest.fullWidth ? classes.fullWidth : '', className]
        .join(' ')
        .trim(),
    [className, classes.fullWidth, classes.root, classes.rootFocused, isInputFocused, rest.fullWidth],
  );

  const isNotEmpty = useMemo(() => !!rest.value, [rest.value]);

  return (
    <div className={[classes.root, isInputFocused ? classes.rootFocused : '', className].join(' ').trim()}>
      <InputBase type="text" {...rest} onFocus={handleInputFocus} onBlur={handleInputBlur} />
      {icon || (
        <IconButton onClick={onIconClick} className={classes.icon} id={isNotEmpty ? 'close-button' : 'search-button'}>
          {isNotEmpty ? <CloseIcon /> : <SearchIcon />}
        </IconButton>
      )}
    </div>
  );
};
